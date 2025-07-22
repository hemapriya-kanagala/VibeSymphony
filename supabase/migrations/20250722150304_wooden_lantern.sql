/*
  # Add DELETE policy for mood reports

  1. Security
    - Add policy for authenticated users to delete their own mood reports
    - Ensures users can only delete reports they created
*/

CREATE POLICY "Users can delete own mood reports" 
  ON mood_reports FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);