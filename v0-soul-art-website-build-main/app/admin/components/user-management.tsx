'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export default function UserManagement() {
  const supabase = createClient();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: artworks } = await supabase.from('artworks').select('*');

      const enrichedUsers = profiles?.map(profile => {
        const userArtworks = artworks?.filter(a => a.user_id === profile.id) || [];
        return {
          ...profile,
          totalArtworks: userArtworks.length,
          totalEarnings: userArtworks.reduce((sum, a) => sum + (a.amount_earned || 0), 0),
          totalPaid: userArtworks.reduce((sum, a) => sum + (a.payment_received || 0), 0),
        };
      }) || [];

      setUsers(enrichedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (user: any) => {
    setEditingUserId(user.id);
    setEditForm({
      display_name: user.display_name,
      wallet_address: user.wallet_address,
    });
  };

  const saveChanges = async () => {
    if (!editingUserId) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: editForm.display_name,
          wallet_address: editForm.wallet_address,
        })
        .eq('id', editingUserId);

      if (error) throw error;

      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const updateArtworkStatus = async (artworkId: string, field: string, value: any) => {
    try {
      const { error } = await supabase
        .from('artworks')
        .update({ [field]: value })
        .eq('id', artworkId);

      if (error) throw error;
      fetchUsers();
    } catch (error) {
      console.error('Error updating artwork:', error);
    }
  };

  if (isLoading) {
    return <div className="text-slate-400 text-center py-8">Loading users...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              {editingUserId === user.id ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Display Name</Label>
                      <Input
                        value={editForm.display_name}
                        onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Wallet Address</Label>
                      <Input
                        value={editForm.wallet_address || ''}
                        onChange={(e) => setEditForm({ ...editForm, wallet_address: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white text-sm font-mono mt-2"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={saveChanges}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => setEditingUserId(null)}
                      variant="outline"
                      className="border-slate-600"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // Display mode
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{user.display_name || user.email}</h3>
                      <p className="text-sm text-slate-500">{user.email}</p>
                      {user.wallet_address && (
                        <p className="text-xs text-slate-400 font-mono mt-1">{user.wallet_address}</p>
                      )}
                    </div>
                    <Button
                      onClick={() => startEditing(user)}
                      variant="outline"
                      className="border-slate-600 text-slate-300"
                    >
                      Edit Profile
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-slate-500">Artworks</span>
                      <p className="text-white font-medium">{user.totalArtworks}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Earned</span>
                      <p className="text-white font-medium">${user.totalEarnings.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Paid</span>
                      <p className="text-white font-medium">${user.totalPaid.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Member Since</span>
                      <p className="text-white font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
