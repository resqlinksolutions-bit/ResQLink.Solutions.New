
import { createClient } from '@supabase/supabase-js';

// Vite uses import.meta.env for environment variables.
// Use VITE_ prefix for variables to be exposed to the client.
// Using optional chaining to safely access env in case it's not defined at runtime
const supabaseUrl = (import.meta as any)?.env?.VITE_SUPABASE_URL || 'https://qxyeeoovxtioqeqnwiug.supabase.co';
const supabaseKey = (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eWVlb292eHRpb3FlcW53aXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMDY1MzAsImV4cCI6MjA4MzY4MjUzMH0.KQqGHWlk0ED9DB6yqnyRZHUxLXXVSOD42yx70F9FCU8';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to check if Supabase is properly configured with real user keys
export const isSupabaseConfigured = () => {
  const isDefaultUrl = supabaseUrl === 'https://qxyeeoovxtioqeqnwiug.supabase.co';
  const isDefaultKey = supabaseKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eWVlb292eHRpb3FlcW53aXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMDY1MzAsImV4cCI6MjA4MzY4MjUzMH0.KQqGHWlk0ED9DB6yqnyRZHUxLXXVSOD42yx70F9FCU8';
  return !isDefaultUrl && !isDefaultKey;
};
