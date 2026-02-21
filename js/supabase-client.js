// Public Supabase keys for the blog-system project. These are safe to expose on the client side.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://gtsjaajfacumjilsnfow.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0c2phYWpmYWN1bWppbHNuZm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NDE5MTgsImV4cCI6MjA4NzIxNzkxOH0.bHMWl2zZVrVV9O4k14mBfi29TU-p_--sUtUVkDfVuaM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
