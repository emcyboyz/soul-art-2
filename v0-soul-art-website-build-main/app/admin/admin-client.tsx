'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@supabase/auth-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ReviewQueue from './components/review-queue';
import UserManagement from './components/user-management';

export default function AdminClient({ user }: { user: User }) {
  const supabase = createClient();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'queue' | 'users'>('queue');
  const [stats, setStats] = useState({
    pendingReviews: 0,
    totalArtworks: 0,
    approvedToday: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: artworks } = await supabase.from('artworks').select('*');
      const { data: profiles } = await supabase.from('profiles').select('*');

      const pending = artworks?.filter(a => a.status === 'pending').length || 0;
      const approved = artworks?.filter(a => 
        a.status === 'approved' && 
        new Date(a.updated_at).toDateString() === new Date().toDateString()
      ).length || 0;

      setStats({
        pendingReviews: pending,
        totalArtworks: artworks?.length || 0,
        approvedToday: approved,
        totalUsers: profiles?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
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
          <span className="text-xl font-bold">SoulArt Admin</span>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-slate-300">
          Logout
        </Button>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Pending Reviews', value: stats.pendingReviews, color: 'text-yellow-400' },
            { label: 'Total Artworks', value: stats.totalArtworks, color: 'text-blue-400' },
            { label: 'Approved Today', value: stats.approvedToday, color: 'text-green-400' },
            { label: 'Total Users', value: stats.totalUsers, color: 'text-purple-400' }
          ].map((stat, idx) => (
            <Card key={idx} className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <Button
            onClick={() => setActiveTab('queue')}
            variant={activeTab === 'queue' ? 'default' : 'ghost'}
            className={activeTab === 'queue' ? 'border-b-2 border-blue-500' : 'text-slate-400'}
          >
            Review Queue
          </Button>
          <Button
            onClick={() => setActiveTab('users')}
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            className={activeTab === 'users' ? 'border-b-2 border-blue-500' : 'text-slate-400'}
          >
            User Management
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'queue' && <ReviewQueue onStatusChange={fetchStats} />}
        {activeTab === 'users' && <UserManagement />}
      </div>
    </div>
  );
}
