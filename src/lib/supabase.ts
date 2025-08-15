import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use environment variables from .env.example if not configured
const defaultUrl = 'https://afceshaeqqmbrtudlhwz.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmY2VzaGFlcXFtYnJ0dWRsaHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2ODU3MTEsImV4cCI6MjA2MDI2MTcxMX0.-d9660Q-9wg89z0roOw4-czkWxq2fxdKOJX9SilKz2U';

const finalUrl = supabaseUrl || defaultUrl;
const finalKey = supabaseAnonKey || defaultKey;

// Check if we're using default/example values
const isUsingDefaults = !supabaseUrl || !supabaseAnonKey || 
  supabaseUrl === defaultUrl || supabaseAnonKey === defaultKey;

let supabase: any;

if (isUsingDefaults) {
  console.warn('⚠️ Supabase environment variables not configured properly - using mock client');
  
  // Create a mock client that returns errors instead of making network requests
  const mockClient = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      upsert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
    }),
    auth: {
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  };
  
  supabase = mockClient as any;
} else {
  supabase = createClient(finalUrl, finalKey);
}

export { supabase };