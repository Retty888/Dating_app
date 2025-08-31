import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables at runtime
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Ensure both required environment variables are present before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [
    !supabaseUrl && 'EXPO_PUBLIC_SUPABASE_URL',
    !supabaseAnonKey && 'EXPO_PUBLIC_SUPABASE_ANON_KEY',
  ].filter(Boolean);
  throw new Error(`Missing environment variables: ${missing.join(', ')}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
