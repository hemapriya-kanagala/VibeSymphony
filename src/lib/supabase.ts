import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      mood_reports: {
        Row: {
          id: string
          user_id: string | null
          mood_text: string
          vibe_title: string
          motivational_message: string
          playlist_links: any[] // Changed to any[] to match jsonb structure
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          mood_text: string
          vibe_title: string
          motivational_message: string
          playlist_links: any[]
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          mood_text?: string
          vibe_title?: string
          motivational_message?: string
          playlist_links?: any[]
          created_at?: string
        }
      }
    }
  }
}