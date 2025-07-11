export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key",
}

// Validate configuration
if (!supabaseConfig.url || supabaseConfig.url === "https://your-project.supabase.co") {
  console.warn("Supabase URL not configured. Using mock data for development.")
}

if (!supabaseConfig.anonKey || supabaseConfig.anonKey === "your-anon-key") {
  console.warn("Supabase Anon Key not configured. Using mock data for development.")
}
