'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UserWallet {
  id: string;
  username: string;
  wallet: string | null;
}

export default function WalletManagement() {
  const [wallets, setWallets] = useState<UserWallet[]>([
    { id: '1', username: 'artist_luna', wallet: '9B5X4nG3V8M2P5L8Q1K4J9H6F3C7R2S5' },
    { id: '2', username: 'creative_max', wallet: null },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newWallet, setNewWallet] = useState('');

  const handleAddWallet = (id: string) => {
    setEditingId(id);
    setNewWallet('');
  };

  const handleSaveWallet = (id: string) => {
    const solanaRegex = /^[1-9A-HJ-NP-Z]{32,44}$/;
    if (solanaRegex.test(newWallet)) {
      setWallets(wallets.map(w => w.id === id ? { ...w, wallet: newWallet } : w));
      setEditingId(null);
    }
  };

  const handleRemoveWallet = (id: string) => {
    setWallets(wallets.map(w => w.id === id ? { ...w, wallet: null } : w));
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Wallet Management</h2>
        <p className="text-slate-400">Manage user Solana wallet addresses</p>
      </div>

      <div className="space-y-4">
        {wallets.map((wallet, idx) => (
          <Card
            key={wallet.id}
            className="bg-slate-800/50 border-slate-700/50 p-6 card-hover scroll-scale"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
              <div>
                <p className="text-sm text-slate-400">Username</p>
                <p className="font-semibold text-white">{wallet.username}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Wallet Address</p>
                {editingId === wallet.id ? (
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newWallet}
                      onChange={(e) => setNewWallet(e.target.value)}
                      placeholder="Solana wallet address..."
                      className="bg-slate-700 border-slate-600 text-white text-sm h-9 p-2"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveWallet(wallet.id)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Save
                    </Button>
                  </div>
                ) : wallet.wallet ? (
                  <p className="font-mono text-xs text-blue-300 truncate">{wallet.wallet}</p>
                ) : (
                  <p className="text-sm text-slate-500">No wallet added</p>
                )}
              </div>
              <div className="flex gap-2">
                {wallet.wallet ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleAddWallet(wallet.id)}
                      className="bg-slate-700 hover:bg-slate-600"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRemoveWallet(wallet.id)}
                      variant="outline"
                      className="border-red-600 text-red-400"
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleAddWallet(wallet.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Add Wallet
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
