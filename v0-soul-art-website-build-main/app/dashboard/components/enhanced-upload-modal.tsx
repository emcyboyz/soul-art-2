'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function EnhancedUploadModal({
  isOpen,
  onClose,
  onSuccess,
  userId
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}) {
  const supabase = createClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (file: File, type: 'image' | 'video') => {
    if (type === 'image') {
      setImageFile(file);
      setVideoFile(null);
      // Show preview for image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setVideoFile(file);
      setImageFile(null);
      setImagePreview('');
    }
    setUrlInput('');
    setError('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dragAreaRef.current?.classList.add('border-blue-400', 'bg-blue-500/5');
  };

  const handleDragLeave = () => {
    dragAreaRef.current?.classList.remove('border-blue-400', 'bg-blue-500/5');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragAreaRef.current?.classList.remove('border-blue-400', 'bg-blue-500/5');
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file?.type.startsWith('image/')) {
      handleFileSelect(file, 'image');
    } else if (file?.type.startsWith('video/')) {
      handleFileSelect(file, 'video');
    } else {
      setError('Please drop an image or video file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    // Check at least one upload option is provided
    if (!imageFile && !videoFile && !urlInput.trim()) {
      setError('Please provide either an image, video, or URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let imageUrl = urlInput;
      let videoUrl = '';

      if (imageFile) {
        const fileName = `${userId}/${Date.now()}_${imageFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('artwork-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from('artwork-images')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrlData.publicUrl;
      }

      if (videoFile) {
        const fileName = `${userId}/${Date.now()}_${videoFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('artwork-videos')
          .upload(fileName, videoFile);

        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from('artwork-videos')
          .getPublicUrl(fileName);
        
        videoUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('artworks').insert({
        user_id: userId,
        title,
        description,
        image_url: imageUrl || '/abstract-colorful-artwork.png',
        video_url: videoUrl,
        royalty_percentage: royaltyPercentage,
        status: 'pending'
      });

      if (insertError) throw insertError;

      // Reset form
      setTitle('');
      setDescription('');
      setRoyaltyPercentage(10);
      setImageFile(null);
      setVideoFile(null);
      setUrlInput('');
      setImagePreview('');
      setUploadProgress(0);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload artwork');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl bg-slate-900 border-slate-700 my-8">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Your Artwork</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label className="text-slate-300">Title *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name your masterpiece"
                required
                className="bg-slate-800 border-slate-700 text-white mt-2"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-slate-300">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your art"
                className="bg-slate-800 border-slate-700 text-white mt-2"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">Upload Content *</Label>
              
              {/* Drag and Drop Area */}
              <div
                ref={dragAreaRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-500/5"
              >
                <p className="text-slate-400 mb-3">Drag and drop your image or video here</p>
                <p className="text-sm text-slate-500 mb-4">or</p>
                <div className="flex gap-3 justify-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => imageInputRef.current?.click()}
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    Select Image
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => videoInputRef.current?.click()}
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    Select Video
                  </Button>
                </div>
              </div>

              {/* File inputs (hidden) */}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files[0], 'image')}
                className="hidden"
              />
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files[0], 'video')}
                className="hidden"
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-slate-700">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* File Selection Status */}
              {(imageFile || videoFile) && (
                <div className="bg-slate-800/50 rounded-lg p-4 flex justify-between items-center">
                  <div className="text-sm text-slate-300">
                    <span className="font-medium">{imageFile?.name || videoFile?.name}</span>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setImageFile(null);
                      setVideoFile(null);
                      setImagePreview('');
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </Button>
                </div>
              )}

              {/* URL Input - Alternative */}
              <div className="text-center text-sm text-slate-500 py-3">or paste a URL</div>
              <Input
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setImageFile(null);
                  setVideoFile(null);
                  setImagePreview('');
                }}
                placeholder="https://example.com/artwork.jpg"
                type="url"
                className="bg-slate-800 border-slate-700 text-white text-sm"
              />
            </div>

            {/* Royalty */}
            <div>
              <Label className="text-slate-300">Royalty Percentage (1-100%)</Label>
              <Input
                type="number"
                min="1"
                max="100"
                value={royaltyPercentage}
                onChange={(e) => setRoyaltyPercentage(Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white mt-2"
              />
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-400 text-center">{uploadProgress}% uploaded</p>
              </div>
            )}

            {error && <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded">{error}</p>}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-slate-600"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isLoading ? 'Uploading...' : 'Upload Artwork'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
