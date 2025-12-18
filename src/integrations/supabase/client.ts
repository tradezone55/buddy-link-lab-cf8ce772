import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ttljckgyogrmefinkxzi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGpja2d5b2dybWVmaW5reHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNzU0NDMsImV4cCI6MjA4MTY1MTQ0M30.8_d8n_bGIERCOmgaGgDU8s0Su7_pngQsIDgayDcyiFY";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);