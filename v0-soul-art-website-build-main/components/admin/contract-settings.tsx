'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContractSettings() {
  const [contractAddress, setContractAddress] = useState('9B5X4nG3V8M2P5L8Q1K4J9H6F3C7R2S5');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Contract address updated successfully!');
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Contract Address Settings</h2>
        <p className="text-slate-400">Manage the blockchain contract address</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700/50 p-8 card-hover scroll-scale max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contract Address (Solana)
            </label>
            <Input
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white font-mono text-sm"
              placeholder="Enter Solana contract address..."
            />
            <p className="text-xs text-slate-400 mt-2">
              This address is used for the copy-to-clipboard function throughout the site.
            </p>
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isSaving ? 'Saving...' : 'Save Contract Address'}
            </Button>
            <Button
              variant="outline"
              className="border-slate-600"
              onClick={() => setContractAddress('9B5X4nG3V8M2P5L8Q1K4J9H6F3C7R2S5')}
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
