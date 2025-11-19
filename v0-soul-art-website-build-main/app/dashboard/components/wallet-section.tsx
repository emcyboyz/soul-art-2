'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@supabase/auth-js';
import { useEffect, useState } from 'react';

export default function WalletSection({ user }: { user: User }) {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
      setWalletAddress(data?.wallet_address || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSaveWallet = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ wallet_address: walletAddress })
        .eq('id', user.id);

      if (error) throw error;

      setProfile({ ...profile, wallet_address: walletAddress });
      setIsEditing(false);
      setSuccessMessage('Wallet saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving wallet:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const isMissingWallet = !profile?.wallet_address;

  return (
    <Card className={`border-2 ${isMissingWallet ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-slate-700 bg-slate-800/50'}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Wallet Information
            {isMissingWallet && <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">Missing</span>}
          </h3>
          {!isEditing && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="border-slate-600 text-slate-300"
            >
              Edit
            </Button>
          )}
        </div>

        {!isEditing ? (
          <div>
            {profile?.wallet_address ? (
              <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-slate-200 break-all">
                {profile.wallet_address}
              </div>
            ) : (
              <p className="text-slate-400 italic">No wallet connected yet. Add one to receive payments.</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <Label className="text-slate-300">Solana Wallet Address</Label>
              <Input
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="e.g., 9B5X4nG3V8M2P5L8Q1K4J9H6F3C7R2S5"
                className="bg-slate-800 border-slate-600 text-white font-mono text-sm mt-2"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSaveWallet}
                disabled={isSaving}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isSaving ? 'Saving...' : 'Save Wallet'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setWalletAddress(profile?.wallet_address || '');
                }}
                className="border-slate-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {successMessage && (
          <p className="text-green-400 text-sm mt-3 animate-fadeInUp">{successMessage}</p>
        )}
      </div>
    </Card>
  );
}
