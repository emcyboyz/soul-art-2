'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const ADMIN_PASSWORD = 'spooky';

export default function AdminBackdoorModal() {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setShowModal(true);
        setPassword('');
        setError('');
      }
      if (e.key === 'Escape') {
        setShowModal(false);
        setPassword('');
        setError('');
        setIsVerified(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsVerified(true);
      setError('');
      sessionStorage.setItem('adminMode', 'true');
      // Redirect to admin panel after verification
      window.location.href = '/admin-dashboard';
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-slate-900 border-slate-700 animate-slideInUp shadow-2xl">
        <style>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        
        <div className="p-8 text-center">
          {!isVerified ? (
            <>
              <div className="absolute inset-0 -z-10 bg-purple-500/20 blur-3xl rounded-lg" />
              
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <span className="text-purple-400">✨</span> Admin Access
              </h2>
              <p className="text-slate-400 text-sm mb-6">Enter the password to access admin panel</p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <Label className="text-slate-300 text-left block">Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="••••••"
                    autoFocus
                    className="bg-slate-800 border-slate-700 text-white mt-2"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded px-3 py-2 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowModal(false);
                      setPassword('');
                      setError('');
                    }}
                    className="flex-1 border-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Unlock
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <p className="text-green-400 text-lg font-semibold mb-4">Access Granted!</p>
              <p className="text-slate-400 text-sm">Redirecting to admin panel...</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
