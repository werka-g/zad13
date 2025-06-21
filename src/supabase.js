import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edecftnrzqsnavnmsqol.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZWNmdG5yenFzbmF2bm1zcW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTgxNDksImV4cCI6MjA2NjA5NDE0OX0.T-pzRGJQBer8cqj3W58erOSVAqL0AD-rjKEA281qyQ0';

export const supabase = createClient(supabaseUrl, supabaseKey);
