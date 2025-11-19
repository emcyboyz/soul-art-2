'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-700 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="animate-fadeInUp">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/design-mode/logo%20%283%29.png"
                alt="SoulArt Logo"
                width={32}
                height={32}
              />
              <span className="font-bold text-white">SoulArt</span>
            </div>
            <p className="text-sm">Empowering creators with fair royalties and full control.</p>
          </div>

          {/* Product */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
              <li><Link href="/sign-up" className="hover:text-blue-400 transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 flex justify-between items-center text-sm animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <p>&copy; 2025 SoulArt. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-blue-400 transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Discord</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
