import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Property {
  id: string;
  property_id: string;
  name: string;
  prop_type: string;
  city: string | null;
  property_address: string;
  assessed_value: number;
  appraised_value: number;
  geo_id: string | null;
  description: string | null;
  search_term: string | null;
  scraped_at: string;
  created_at: string;
  updated_at: string;
}
