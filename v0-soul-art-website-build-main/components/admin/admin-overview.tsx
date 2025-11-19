'use client';

import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface MetricCard {
  label: string;
  value: number;
  icon: string;
}

export default function AdminOverview() {
  const [metrics, setMetrics] = useState<MetricCard[]>([
    { label: 'Total Users', value: 0, icon: '👥' },
    { label: 'Pending Uploads', value: 0, icon: '⏳' },
    { label: 'Approved Uploads', value: 0, icon: '✅' },
    { label: 'Rejected Uploads', value: 0, icon: '❌' },
    { label: 'Total Videos', value: 0, icon: '🎬' },
    { label: 'Total Images', value: 0, icon: '🖼️' },
  ]);

  const [storageUsed, setStorageUsed] = useState(45);

  useEffect(() => {
    // Simulate fetching metrics from database
    setMetrics([
      { label: 'Total Users', value: 1247, icon: '👥' },
      { label: 'Pending Uploads', value: 23, icon: '⏳' },
      { label: 'Approved Uploads', value: 892, icon: '✅' },
      { label: 'Rejected Uploads', value: 34, icon: '❌' },
      { label: 'Total Videos', value: 156, icon: '🎬' },
      { label: 'Total Images', value: 736, icon: '🖼️' },
    ]);
  }, []);

  return (
    <div className="space-y-8 animate-fadeInUp">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-slate-400">Real-time system metrics and analytics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <Card
            key={idx}
            className="bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 p-6 card-hover scroll-scale"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">{metric.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    {metric.value.toLocaleString()}
                  </span>
                </div>
              </div>
              <span className="text-3xl">{metric.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Storage Usage */}
      <Card className="bg-slate-800/50 border-slate-700/50 p-6 scroll-scale">
        <h3 className="text-lg font-semibold text-white mb-4">System Storage</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Used</span>
            <span className="text-slate-300">{storageUsed}% / 100%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${storageUsed}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">~450 GB of 1 TB used</p>
        </div>
      </Card>
    </div>
  );
}
