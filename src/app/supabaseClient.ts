import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://qqqylvkiqjlvrlbbobiu.supabase.co"
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcXlsdmtpcWpsdnJsYmJvYml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NTI2MTcsImV4cCI6MTk5OTQyODYxN30.r0MDtzO-LSrQV7erZ1WnnCq6ncLQ_yyyrA4lvp0Bwf8"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)