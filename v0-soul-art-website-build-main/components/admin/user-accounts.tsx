'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface User {
  id: string;
  username: string;
  email: string;
  wallet: string;
  joinDate: string;
  uploads: number;
  enabled: boolean;
}

export default function UserAccounts() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'artist_luna',
      email: 'luna@example.com',
      wallet: '9B5X4nG3V8M2P5L8Q1K4J9H6F3C7R2S5',
      joinDate: '2024-01-15',
      uploads: 12,
      enabled: true,
    },
    {
      id: '2',
      username: 'creative_max',
      email: 'max@example.com',
      wallet: '3F7M8P2K5L9R4S1H6C9V3W7Q0X2J8B5',
      joinDate: '2024-02-20',
      uploads: 8,
      enabled: true,
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editWallet, setEditWallet] = useState('');

  const handleEditWallet = (id: string, wallet: string) => {
    setEditingId(id);
    setEditWallet(wallet);
  };

  const handleSaveWallet = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, wallet: editWallet } : u));
    setEditingId(null);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, enabled: !u.enabled } : u));
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">User Accounts</h2>
        <p className="text-slate-400">Manage registered users and their information</p>
      </div>

      <div className="overflow-x-auto">
        <div className="space-y-4">
          {users.map((user) => (
            <Card
              key={user.id}
              className="bg-slate-800/50 border-slate-700/50 p-6 card-hover scroll-scale"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
                <div>
                  <p className="text-sm text-slate-400">Username</p>
                  <p className="font-semibold text-white">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="font-mono text-sm text-blue-300 truncate">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Wallet</p>
                  {editingId === user.id ? (
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={editWallet}
                        onChange={(e) => setEditWallet(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white text-sm h-8 p-2"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveWallet(user.id)}
                        className="bg-blue-500 hover:bg-blue-600 h-8 px-3"
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <p
                      className="font-mono text-xs text-slate-300 truncate cursor-pointer hover:text-blue-300"
                      onClick={() => handleEditWallet(user.id, user.wallet)}
                    >
                      {user.wallet}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-400">Joined</p>
                  <p className="text-white">{user.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Uploads</p>
                  <p className="text-lg font-bold text-white">{user.uploads}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => toggleUserStatus(user.id)}
                    className={user.enabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                  >
                    {user.enabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
