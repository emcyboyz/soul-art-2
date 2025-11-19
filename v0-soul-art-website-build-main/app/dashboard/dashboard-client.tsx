'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@supabase/auth-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileHeader from './components/profile-header';
import ArtworkGallery from './components/artwork-gallery';
import EnhancedUploadModal from './components/enhanced-upload-modal';
import WalletSection from './components/wallet-section';

export default function DashboardClient({ user }: { user: User }) {
  const supabase = createClient();
  const router = useRouter();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalViews: 0, totalLikes: 0, earnings: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArtworks(data || []);

      // Calculate stats
      const totalViews = data?.reduce((sum, art) => sum + (art.views || 0), 0) || 0;
      const totalLikes = data?.length || 0;
      setStats({ totalViews, totalLikes, earnings: 0 });
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    setIsUploadOpen(false);
    fetchArtworks();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-900/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <Image
            src="/images/design-mode/logo%20%283%29.png"
            alt="SoulArt Logo"
            width={35}
            height={35}
          />
          <span className="text-xl font-bold">SoulArt Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsUploadOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Upload Art
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="text-slate-300">
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Profile Header */}
        <ProfileHeader user={user} stats={stats} />

        {/* Wallet Section */}
        <div className="mb-8">
          <WalletSection user={user} />
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Views', value: stats.totalViews },
            { label: 'Total Likes', value: stats.totalLikes },
            { label: 'Artworks', value: artworks.length },
            { label: 'Pending Review', value: artworks.filter(a => a.status === 'pending').length }
          ].map((stat, idx) => (
            <Card key={idx} className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Artworks Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Artworks</h2>
            <div className="text-sm text-slate-400">
              {artworks.length} works • {artworks.filter(a => a.status === 'approved').length} approved
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-slate-400">Loading your artworks...</div>
          ) : artworks.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700 text-center py-12">
              <div className="space-y-4">
                <p className="text-slate-300">No artworks yet</p>
                <Button
                  onClick={() => setIsUploadOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  Upload Your First Artwork
                </Button>
              </div>
            </Card>
          ) : (
            <ArtworkGallery artworks={artworks} onRefresh={fetchArtworks} />
          )}
        </div>
      </div>

      <EnhancedUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={handleUploadSuccess}
        userId={user.id}
      />
    </div>
  );
}
