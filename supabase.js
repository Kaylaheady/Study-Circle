import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase URL and Anon Key
const SUPABASE_URL = "https://ssolcjnuddlznarnojud.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzb2xjam51ZGRsem5hcm5vanVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNTk1MjcsImV4cCI6MjA1NjYzNTUyN30.kz2vUx7DAvbEzzOvff48o51z-wp4i23Sb9Jypt9Lnro";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
