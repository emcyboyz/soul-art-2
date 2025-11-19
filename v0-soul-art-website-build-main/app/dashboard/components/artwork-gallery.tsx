'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ArtworkGallery({ artworks, onRefresh }: { artworks: any[]; onRefresh: () => void }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <Card key={artwork.id} className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-blue-500/50 transition-all">
          <CardContent className="p-0">
            <div className="relative w-full h-48 bg-slate-900">
              {artwork.image_url && (
                <Image
                  src={artwork.image_url || "/placeholder.svg"}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute top-2 right-2">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  artwork.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                  artwork.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                  'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {artwork.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{artwork.title}</h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{artwork.description}</p>
              <div className="flex justify-between text-sm text-slate-400 mb-4">
                <span>{artwork.views} views</span>
                <span>{artwork.royalty_percentage}% royalty</span>
              </div>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 text-sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
