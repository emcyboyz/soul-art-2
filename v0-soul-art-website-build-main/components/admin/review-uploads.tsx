'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Upload {
  id: string;
  fileName: string;
  fileType: 'image' | 'video';
  uploadedBy: string;
  userWallet: string;
  uploadDate: string;
  aiStatus: 'passed' | 'flagged';
}

export default function ReviewUploads() {
  const [uploads, setUploads] = useState<Upload[]>([
    {
      id: '1',
      fileName: 'abstract_art_001.png',
      fileType: 'image',
      uploadedBy: 'luna@example.com',
      userWallet: '9B5X4nG3V8M2P5L8Q1K4J9H6F3C7R2S5',
      uploadDate: '2024-03-15',
      aiStatus: 'passed',
    },
    {
      id: '2',
      fileName: 'portfolio_video_001.mp4',
      fileType: 'video',
      uploadedBy: 'max@example.com',
      userWallet: '3F7M8P2K5L9R4S1H6C9V3W7Q0X2J8B5',
      uploadDate: '2024-03-14',
      aiStatus: 'flagged',
    },
  ]);

  const handleApprove = (id: string) => {
    setUploads(uploads.filter(u => u.id !== id));
  };

  const handleReject = (id: string) => {
    setUploads(uploads.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Review Uploads</h2>
        <p className="text-slate-400">Approve or reject user submissions</p>
      </div>

      <div className="space-y-4">
        {uploads.map((upload, idx) => (
          <Card
            key={upload.id}
            className="bg-slate-800/50 border-slate-700/50 p-6 card-hover scroll-scale"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-4 items-center">
              <div>
                <p className="text-sm text-slate-400">File</p>
                <p className="font-mono text-sm text-white truncate">{upload.fileName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Type</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                  upload.fileType === 'image' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {upload.fileType === 'image' ? '🖼️ Image' : '🎬 Video'}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-400">Uploaded By</p>
                <p className="text-white text-sm">{upload.uploadedBy}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Date</p>
                <p className="text-white">{upload.uploadDate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">AI Check</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                  upload.aiStatus === 'passed' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {upload.aiStatus === 'passed' ? '✅ Passed' : '⚠️ Flagged'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleApprove(upload.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleReject(upload.id)}
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600"
                >
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
