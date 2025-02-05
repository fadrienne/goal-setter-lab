import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdamgeerddbblnqdongf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYW1nZWVyZGRiYmxucWRvbmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMTY2NDAsImV4cCI6MjAyMjY5MjY0MH0.dqVVvvX6I-Yw_60QQp4lkE_jXM_GC_I5E1G-jrHk0Ys';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});