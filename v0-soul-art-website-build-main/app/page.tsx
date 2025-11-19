'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ContentGuidelinesSection from '@/components/content-guidelines-section';
import Footer from '@/components/footer';
import AcceptedContentGuidelines from '@/components/accepted-content-guidelines';

export default function HomePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/images/design-mode/logo%20%283%29.png"
            alt="SoulArt Logo"
            width={40}
            height={40}
            className="animate-bounce"
            style={{ animationDuration: '3s' }}
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">SoulArt</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-slate-800">Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div
          className={`flex-1 space-y-6 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Create Art,Memes.
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Upload, Get paid.
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              SoulArt pays for your unique Artworks,sketches
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>10-50% royalty per sale</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>Instant payouts worldwide</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200">
              <div className="w-2 h-2 bg-pink-400 rounded-full" />
              <span>No hidden fees or restrictions</span>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <Button
              onClick={() => router.push('/sign-up')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg"
            >
              Start Creating
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg border-slate-600 text-white hover:bg-slate-800"
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Why SoulArt?
            </Button>
          </div>
        </div>

        {/* Right - Animated Logo */}
        <div
          className={`flex-1 flex justify-center transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="relative w-80 h-80">
            {/* Floating glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
            
            {/* Logo image */}
            <Image
              src="/images/design-mode/logo%20%283%29.png"
              alt="SoulArt Ghost Character"
              width={320}
              height={320}
              className="relative z-10 w-full h-full object-contain"
              priority
            />

            {/* Floating animation */}
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
              }
              .animate-float {
                animation: float 4s ease-in-out infinite;
              }
            `}</style>
            <div className="absolute inset-0 animate-float" style={{ animationDelay: '0s' }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="explore" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 animate-slideInUp">Why Choose SoulArt?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Fair Royalties',
              description: 'Keep 50-90% of earnings on every purchase. Your art, your rules.',
              icon: '✨'
            },
            {
              title: 'Instant Payouts',
              description: 'Get paid directly to your wallet. No delays, no middlemen.',
              icon: '⚡'
            },
            {
              title: 'Creative Control',
              description: 'Complete ownership of your work. License and pricing at your discretion.',
              icon: '🎨'
            },
            {
              title: 'Global Reach',
              description: 'Connect with collectors worldwide. Unlimited market potential.',
              icon: '🌍'
            },
            {
              title: 'Artist Community',
              description: 'Collaborate, learn, and grow with fellow creators.',
              icon: '👥'
            },
            {
              title: 'Zero Setup Fees',
              description: 'Start selling immediately. No upfront costs or commissions.',
              icon: '🚀'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="feature-card p-8 rounded-xl bg-slate-800/50 backdrop-blur border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group scroll-scale"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-3xl mb-4 feature-icon transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 line-animate text-white">{feature.title}</h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accepted Content Guidelines Section */}
      <AcceptedContentGuidelines />

      {/* CTA Footer */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Join the Creative Revolution?</h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
          Begin your journey as a creator. Upload your art, set your terms, and start earning today.
        </p>
        <Button
          onClick={() => router.push('/sign-up')}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg"
        >
          Get Started Now
        </Button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
