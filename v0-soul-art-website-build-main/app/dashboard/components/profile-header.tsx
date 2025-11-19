'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/auth-js';
import { useEffect, useState } from 'react';

export default function ProfileHeader({ user, stats }: { user: User; stats: any }) {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-slate-700">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{profile?.display_name || user.email}</h1>
          <p className="text-slate-400 mb-6">{profile?.bio || 'Add a bio to your profile'}</p>
          <div className="flex gap-8">
            <div>
              <div className="text-sm text-slate-400">Member Since</div>
              <div className="text-lg font-semibold">{new Date(user.created_at!).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Total Earnings</div>
              <div className="text-lg font-semibold text-green-400">$0</div>
            </div>
          </div>
        </div>
        <Button variant="outline" className="border-slate-600 text-white">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
