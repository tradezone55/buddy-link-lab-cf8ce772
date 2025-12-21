import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ieqxxafpnxjyojtfstkw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllcXh4YWZwbnhqeW9qdGZzdGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NTc5MzksImV4cCI6MjA3MTAzMzkzOX0.0nfq26HsG46HAzm6vdazqCDtGGBkS4d9l2I-EyL3Qxo";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
