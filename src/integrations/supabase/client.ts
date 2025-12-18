import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://fvrkelbvfwwuihbppvw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cmtlbGJ2Znd3dWloYnBwdnciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNDU2MDM0MSwiZXhwIjoyMDUwMTM2MzQxfQ.s-S2dNNxbNlXGqHfPJRrB6KiH6TqPRVyO0z9w-2_zGQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
