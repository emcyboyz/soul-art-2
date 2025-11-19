'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ReviewQueue({ onStatusChange }: { onStatusChange: () => void }) {
  const supabase = createClient();
  const [artworks, setArtworks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPendingArtworks();
  }, []);

  const fetchPendingArtworks = async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from('artworks')
        .select('*, profiles:user_id(display_name, email)')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      setArtworks(data || []);
    } catch (error) {
      console.error('Error fetching pending artworks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (artworkId: string) => {
    try {
      const { error } = await supabase
        .from('artworks')
        .update({ status: 'approved' })
        .eq('id', artworkId);

      if (error) throw error;
      fetchPendingArtworks();
      onStatusChange();
    } catch (error) {
      console.error('Error approving artwork:', error);
    }
  };

  const handleReject = async (artworkId: string) => {
    try {
      const { error } = await supabase
        .from('artworks')
        .update({ status: 'rejected' })
        .eq('id', artworkId);

      if (error) throw error;
      fetchPendingArtworks();
      onStatusChange();
    } catch (error) {
      console.error('Error rejecting artwork:', error);
    }
  };

  if (isLoading) {
    return <div className="text-slate-400 text-center py-8">Loading artworks...</div>;
  }

  if (artworks.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 text-center py-12">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-300">No Pending Reviews</h3>
          <p className="text-slate-400">All artworks have been reviewed!</p>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review Queue ({artworks.length})</h2>
      <div className="space-y-4">
        {artworks.map((artwork) => (
          <Card key={artwork.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Artwork Preview */}
                <div className="flex-shrink-0 w-32 h-32 bg-slate-900 rounded-lg overflow-hidden">
                  {artwork.image_url && (
                    <Image
                      src={artwork.image_url || "/placeholder.svg"}
                      alt={artwork.title}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Artwork Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{artwork.title}</h3>
                  <p className="text-slate-400 mb-3">{artwork.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-slate-500">Artist:</span>
                      <p className="text-white font-medium">{artwork.profiles?.display_name || 'Unknown'}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Royalty Rate:</span>
                      <p className="text-white font-medium">{artwork.royalty_percentage}%</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleReject(artwork.id)}
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApprove(artwork.id)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
