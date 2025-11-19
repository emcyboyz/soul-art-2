'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function SiteContentSettings() {
  const [content, setContent] = useState({
    heroTitle: 'Empower Your Creative Vision',
    heroDescription: 'SoulArt is a creator-first marketplace where your art flourishes.',
    contactEmail: 'support@soulart.com',
    bannerMessage: 'Welcome to SoulArt! Share your creativity with the world.',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Site content updated successfully!');
    }, 500);
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Site Content Settings</h2>
        <p className="text-slate-400">Manage editable content across the website</p>
      </div>

      <div className="space-y-4 max-w-3xl">
        <Card className="bg-slate-800/50 border-slate-700/50 p-6 card-hover scroll-scale">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Hero Section Title
              </label>
              <Input
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Hero Section Description
              </label>
              <Textarea
                value={content.heroDescription}
                onChange={(e) => setContent({ ...content, heroDescription: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Contact Email
              </label>
              <Input
                type="email"
                value={content.contactEmail}
                onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Banner Message
              </label>
              <Input
                value={content.bannerMessage}
                onChange={(e) => setContent({ ...content, bannerMessage: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isSaving ? 'Saving...' : 'Save All Changes'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
