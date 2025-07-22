/*
  # Create mood reports table

  1. New Tables
    - `mood_reports`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, nullable for anonymous reports)
      - `mood_text` (text, the user's original mood input)
      - `vibe_title` (text, the AI-generated vibe title)
      - `motivational_message` (text, the AI-generated motivational message)
      - `playlist_links` (jsonb, array of playlist objects with name, url, imageUrl)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `mood_reports` table
    - Add policies for authenticated users to read/write their own data
    - Add policy for anonymous users to create reports
*/

CREATE TABLE IF NOT EXISTS mood_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_text text NOT NULL,
  vibe_title text NOT NULL,
  motivational_message text NOT NULL,
  playlist_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mood_reports ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read their own mood reports
CREATE POLICY "Users can read own mood reports"
  ON mood_reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own mood reports
CREATE POLICY "Users can insert own mood reports"
  ON mood_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow anonymous users to create mood reports (without saving to user)
CREATE POLICY "Anonymous users can create mood reports"
  ON mood_reports
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS mood_reports_user_id_created_at_idx 
  ON mood_reports(user_id, created_at DESC);