'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function UploadModal({
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
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('artworks').insert({
        user_id: userId,
        title,
        description,
        image_url: imageUrl || '/abstract-colorful-artwork.png',
        royalty_percentage: royaltyPercentage,
        status: 'pending'
      });

      if (insertError) throw insertError;

      setTitle('');
      setDescription('');
      setRoyaltyPercentage(10);
      setImageUrl('');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload artwork');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-700">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Upload Artwork</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-slate-300">Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Artwork title"
                required
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label className="text-slate-300">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your artwork"
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label className="text-slate-300">Image URL</Label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                type="url"
                className="bg-slate-800 border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <Label className="text-slate-300">Royalty Percentage</Label>
              <Input
                type="number"
                min="1"
                max="100"
                value={royaltyPercentage}
                onChange={(e) => setRoyaltyPercentage(Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

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
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
              >
                {isLoading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
