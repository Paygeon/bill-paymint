import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ptjonufuuuxkcngefhil.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0am9udWZ1dXV4a2NuZ2VmaGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk2MjYwNTEsImV4cCI6MjAzNTIwMjA1MX0.FVluai4CCMXV4D0rnY2ViE8lxwZKuj6Yz7n0dm9HLmw'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
