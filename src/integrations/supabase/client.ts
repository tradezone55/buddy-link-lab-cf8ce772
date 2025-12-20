import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ieqxxafpnxjyojtfstkw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_-uLXNz9evEbnPxM6F_eANg_9oA5XVBN";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
