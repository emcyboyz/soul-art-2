'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AdminSidebarProps {
  currentPage: string;
  onPageChange: (page: any) => void;
  onLogout: () => void;
}

export default function AdminSidebar({ currentPage, onPageChange, onLogout }: AdminSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
    { id: 'users', label: 'User Accounts', icon: '👥' },
    { id: 'uploads', label: 'Review Uploads', icon: '📸' },
    { id: 'wallets', label: 'Wallet Management', icon: '💰' },
    { id: 'contract', label: 'Contract Settings', icon: '⚙️' },
    { id: 'content', label: 'Site Content', icon: '📝' },
  ];

  return (
    <aside className="w-64 bg-slate-900/50 border-r border-slate-700/50 backdrop-blur p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          SoulArt Admin
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              currentPage === item.id
                ? 'bg-blue-500/20 border border-blue-500/50 text-blue-300'
                : 'text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
      >
        Logout
      </Button>
    </aside>
  );
}
