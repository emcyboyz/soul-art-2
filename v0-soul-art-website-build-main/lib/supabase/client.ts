import { createClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createClient> | null = null;
export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error(
      "Supabase environment variables missing: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  // FULL client - includes Storage, Auth, Realtime, everything
  supabaseClient = createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });

  return supabaseClient;
}

export default getSupabaseClient;
export { getSupabaseClient as createClient };
