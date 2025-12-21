import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ieqxxafpnxjyojtfstkw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllcXh4YWZwbnhqeW9qdGZzdGt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0NzI1MzEsImV4cCI6MjA0MTA0ODUzMX0.oPbO4pTjeVdHo8eVMBffCqAJPpTxLvL_ooISPKhpO38";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
