export interface MoodReport {
  id: string
  user_id?: string | null
  mood_text: string
  vibe_title: string
  motivational_message: string
  playlist_links: PlaylistLink[]
  created_at: string
  // Add aliases for different naming conventions
  userId?: string | null
  moodText?: string
  vibeTitle?: string
  motivationalMessage?: string
  playlistLinks?: PlaylistLink[]
  createdAt?: string
}

export interface PlaylistLink {
  name: string
  url: string
  imageUrl?: string
  description?: string
}

export interface GeminiResponse {
  vibeTitle: string
  motivationalMessage: string
  spotifyQuery: string
}

export interface User {
  id: string
  email: string
  name?: string
}