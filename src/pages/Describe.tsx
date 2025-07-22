import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Send, Lightbulb } from 'lucide-react'
import { Button } from '../components/Button'

export function Describe() {
  const [moodText, setMoodText] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const suggestions = [
    "I'm tired but I have work to do",
    "I feel hopeful today",
    "Just got dumped lol",
    "I'm anxious but trying to stay positive",
    "Feeling nostalgic and a bit melancholy",
    "I'm pumped but need to focus"
  ]

  const handleSubmit = async () => {
    if (!moodText.trim()) return
    
    setLoading(true)
    
    try {
      // Call our edge function to process the mood
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-mood`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moodText }),
      })

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Navigate to report page with the results
      navigate('/report', { 
        state: { 
          moodText,
          vibeTitle: data.vibeTitle,
          motivationalMessage: data.motivationalMessage,
          playlists: data.playlists 
        } 
      })
    } catch (error) {
      console.error('Error processing mood:', error)
      // For demo purposes, we'll show a fallback
      navigate('/report', { 
        state: { 
          moodText,
          vibeTitle: "Your Unique Vibe",
          motivationalMessage: "Every feeling deserves the perfect soundtrack 🎵",
          playlists: [
            {
              name: "Chill Vibes",
              url: "https://open.spotify.com/playlist/37i9dQZF1DWS6K1CgLzOXm",
              imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
              description: "Perfect for any mood"
            },
            {
              name: "Feel Good Mix",
              url: "https://open.spotify.com/playlist/37i9dQZF1DWU0ScTcjJBdj",
              imageUrl: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop",
              description: "Uplifting tunes for your soul"
            },
            {
              name: "Mood Booster",
              url: "https://open.spotify.com/playlist/37i9dQZF1DWUa8ZRTfalHk",
              imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
              description: "Get your energy flowing"
            }
          ]
        } 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How are you{' '}
            <span className="bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
              feeling
            </span>
            ?
          </h1>
          <p className="text-xl text-gray-600">
            Just tell me in your own words — no filters, no judgment 💜
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="mood" className="block text-lg font-medium text-gray-700 mb-3">
                Type how you're feeling...
              </label>
              <textarea
                id="mood"
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                placeholder="I'm feeling..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-lavender-300 focus:border-transparent resize-none text-lg"
                maxLength={300}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {moodText.length}/300
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <Lightbulb className="h-5 w-5" />
                <span className="text-sm font-medium">Need inspiration?</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setMoodText(suggestion)}
                    className="px-3 py-1 bg-lavender-50 text-lavender-700 rounded-full text-sm hover:bg-lavender-100 transition-colors"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                disabled={!moodText.trim()}
                loading={loading}
                size="lg"
                className="w-full"
              >
                {loading ? 'Finding your perfect vibe...' : 'Find my vibe'}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}