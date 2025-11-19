import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminClient from './admin-client';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // Simple admin check (in production, use proper role-based access)
  const isAdmin = user.email === 'admin@soulart.com';

  if (!isAdmin) {
    redirect('/dashboard');
  }

  return <AdminClient user={user} />;
}
