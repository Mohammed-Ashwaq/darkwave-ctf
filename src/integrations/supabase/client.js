
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ynwmmwpknlggufwyofnm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlud21td3BrbmxnZ3Vmd3lvZm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzE5NzYsImV4cCI6MjA1NjgwNzk3Nn0.D4jbuofEwp5PoGgk5GGDsb95ggOObFBC8wz9LUuqHF8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
