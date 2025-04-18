import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ctanhyzwlviilnpzcpcv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0YW5oeXp3bHZpaWxucHpjcGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMTI0MjAsImV4cCI6MjA2MDU4ODQyMH0.JZadH6VD1i5ZlsO7k_bAhyq6Ww5O2mMvIdcMYRNYU88';
export const supabase = createClient(supabaseUrl, supabaseKey);
