'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const GuidelineItem = ({ icon, title, items, isAllowed = true }: { icon: string; title: string; items: string[]; isAllowed?: boolean }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-white flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {title}
      </h4>
      <ul className="space-y-1 ml-8 text-slate-300">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm flex items-start gap-2">
            <span className={`font-bold ${isAllowed ? 'text-green-400' : 'text-red-400'}`}>
              {isAllowed ? '✓' : '✗'}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ContentGuidelinesSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
      <div className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h2 className="text-4xl font-bold text-center mb-4">Accepted Content & Upload Guidelines</h2>
        <p className="text-center text-slate-400 mb-16 max-w-3xl mx-auto">
          SoulArt is a creator-first platform built around originality and authenticity. We only accept genuine works created by the uploader.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Allowed Content */}
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30">
            <CardContent className="p-8">
              <div className="space-y-6">
                <GuidelineItem
                  icon="🎨"
                  title="Allowed Content"
                  items={[
                    'Original meme art',
                    'Original meme characters',
                    'Original cartoon drawings and illustrations',
                    'Portraits',
                    'Still life drawings',
                    'Photos of pottery & handmade crafts',
                    'Nature & environmental images',
                    'Lifestyle images',
                    'Original photography of any kind'
                  ]}
                  isAllowed={true}
                />
                <p className="text-sm text-green-300 italic border-l-2 border-green-500 pl-4">
                  All submitted content must be 100% created by you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Not Allowed Content */}
          <Card className="bg-gradient-to-br from-red-500/10 to-rose-500/5 border-red-500/30">
            <CardContent className="p-8">
              <div className="space-y-6">
                <GuidelineItem
                  icon="⛔"
                  title="Not Allowed"
                  items={[
                    'AI-generated images or videos',
                    'Stolen art or reposts',
                    'Images copied from the internet',
                    'Artwork owned by someone else',
                    'Content that appears to be AI-modified'
                  ]}
                  isAllowed={false}
                />
                <div className="space-y-3 pt-4 border-t border-red-500/30">
                  <h4 className="text-sm font-semibold text-red-300 flex items-center gap-2">
                    <span>🔍</span> Plagiarism & AI Detection
                  </h4>
                  <p className="text-sm text-slate-300">
                    SoulArt uses advanced AI tools to detect whether an artwork exists anywhere else online, if it's AI-generated, or if it matches copyrighted material. Uploads flagged by the system will be rejected automatically.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
