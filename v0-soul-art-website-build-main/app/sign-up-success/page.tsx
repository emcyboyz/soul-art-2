import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/design-mode/Untitled_design__26_-removebg-preview.png"
            alt="SoulArt Logo"
            width={80}
            height={80}
          />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Check Your Email</h1>
        <p className="text-slate-300 mb-8">
          We've sent you a confirmation link. Please check your email to verify your account and start creating on SoulArt.
        </p>

        <Link href="/">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
