'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; 
import AdminSidebar from '@/components/admin/admin-sidebar';
import AdminOverview from '@/components/admin/admin-overview';
import UserAccounts from '@/components/admin/user-accounts';
import ReviewUploads from '@/components/admin/review-uploads';
import WalletManagement from '@/components/admin/wallet-management';
import ContractSettings from '@/components/admin/contract-settings';
import SiteContentSettings from '@/components/admin/site-content-settings';

type AdminPage = 'overview' | 'users' | 'uploads' | 'wallets' | 'contract' | 'content';

export default function AdminDashboard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<AdminPage>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function verifyAdmin() {
      // 1. Backdoor check
      const adminMode = sessionStorage.getItem('adminMode');
      if (!adminMode) {
        router.push('/');
        return;
      }

      // 2. Supabase auth check
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login'); 
        return;
      }

      // 3. Verify if user is the admin account
      if (user.email !== 'admin@soulart.com') {
        router.push('/');
        return;
      }

      // All checks passed
      setIsAuthenticated(true);
    }

    verifyAdmin();
  }, [router]);

  const handleLogout = async () => {
    sessionStorage.removeItem('adminMode');
    await supabase.auth.signOut();
    router.push('/');
  };

  if (isAuthenticated === null) return null; // loading
  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <AdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout} />

      <main className="flex-1 overflow-auto">
        <div className="min-h-screen p-8">
          {currentPage === 'overview' && <AdminOverview />}
          {currentPage === 'users' && <UserAccounts />}
          {currentPage === 'uploads' && <ReviewUploads />}
          {currentPage === 'wallets' && <WalletManagement />}
          {currentPage === 'contract' && <ContractSettings />}
          {currentPage === 'content' && <SiteContentSettings />}
        </div>
      </main>
    </div>
  );
}
