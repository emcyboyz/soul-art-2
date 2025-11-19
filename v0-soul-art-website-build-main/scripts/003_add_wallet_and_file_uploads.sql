-- Add wallet_address column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN wallet_address text;

-- Create uploads table for file storage metadata
CREATE TABLE IF NOT EXISTS public.uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  artwork_id uuid REFERENCES public.artworks(id) ON DELETE CASCADE,
  filename text NOT NULL,
  file_type text NOT NULL, -- 'image' or 'video'
  file_url text NOT NULL,
  file_size integer,
  upload_source text DEFAULT 'local', -- 'local' or 'url'
  upload_progress integer DEFAULT 0,
  status text DEFAULT 'completed', -- pending, completed, failed
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on uploads table
ALTER TABLE public.uploads ENABLE ROW LEVEL SECURITY;

-- Uploads RLS Policies
CREATE POLICY "uploads_select_own" ON public.uploads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "uploads_insert_own" ON public.uploads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "uploads_update_own" ON public.uploads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "uploads_delete_own" ON public.uploads FOR DELETE USING (auth.uid() = user_id);

-- Add admin role tracking to profiles
ALTER TABLE public.profiles 
ADD COLUMN is_admin boolean DEFAULT false;

-- Add additional artwork fields for enhanced tracking
ALTER TABLE public.artworks
ADD COLUMN video_url text,
ADD COLUMN amount_earned numeric DEFAULT 0,
ADD COLUMN payment_received numeric DEFAULT 0;
