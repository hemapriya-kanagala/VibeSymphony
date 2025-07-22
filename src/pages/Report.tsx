import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink, Heart, Save, Sparkles, Music, Home, Plus } from 'lucide-react'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export function Report() {
  const location = useLocation()
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [allPlaylists, setAllPlaylists] = useState<any[]>([])
  const [canRequestMore, setCanRequestMore] = useState(true)

  const { moodText, vibeTitle, motivationalMessage, playlists } = location.state || {}

  // Initialize playlists and more button state
  React.useEffect(() => {
    if (playlists) {
      setAllPlaylists(playlists)
      // Show more button if we have exactly 3 playlists (initial load)
      setCanRequestMore(playlists.length === 3)
    }
  }, [playlists])

  const handleSave = async () => {
    if (!user) return
    
    setSaving(true)
    try {
      // Format playlist links to match database schema exactly
      const formattedPlaylistLinks = allPlaylists.map((p: any) => ({
        name: p.name || '',
        url: p.url || '',
        imageUrl: p.imageUrl || '',
        description: p.description || ''
      }))

      console.log('Saving data:', {
        user_id: user.id,
        mood_text: moodText || '',
        vibe_title: vibeTitle || '',
        motivational_message: motivationalMessage || '',
        playlist_links: formattedPlaylistLinks
      })

      const { data, error } = await supabase
        .from('mood_reports')
        .insert([
          {
            user_id: user.id,
            mood_text: moodText || '',
            vibe_title: vibeTitle || '',
            motivational_message: motivationalMessage || '',
            playlist_links: formattedPlaylistLinks
          }
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      console.log('Successfully saved:', data)
      setSaved(true)
    } catch (error) {
      console.error('Error saving mood report:', error)
      alert('Failed to save mood report. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleRequestMore = async () => {
    if (!moodText || loadingMore) return
    
    setLoadingMore(true)
    try {
      // Call our edge function to get more playlists
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-mood`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          moodText,
          requestMore: true 
        }),
      })

      const data = await response.json()
      
      if (data.playlists && data.playlists.length > 0) {
        // Filter out duplicates and add new playlists
        const existingUrls = new Set(allPlaylists.map(p => p.url))
        const newPlaylists = data.playlists.filter((p: any) => !existingUrls.has(p.url))
        
        if (newPlaylists.length > 0) {
          setAllPlaylists(prev => [...prev, ...newPlaylists.slice(0, 6)]) // Max 6 more
        }
      }
      
      // Disable the button after requesting more
      setCanRequestMore(false)
    } catch (error) {
      console.error('Error getting more playlists:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  if (!moodText) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! No mood data found
          </h1>
          <p className="text-gray-600 mb-8">
            Let's start your vibe check from the beginning
          </p>
          <Link to="/describe">
            <Button>Start Fresh</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <Music className="h-16 w-16 text-lavender-500" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="h-6 w-6 text-mint-400" />
              </motion.div>
            </motion.div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Your{' '}
            <span className="bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
              Vibe Report
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Here's what we found for you ✨
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl mb-8"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">You said:</h3>
              <p className="text-gray-600 italic text-lg bg-gray-50 p-4 rounded-2xl">
                "{moodText}"
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Your vibe:</h3>
              <p className="text-2xl font-bold text-lavender-600 mb-2">{vibeTitle}</p>
              <p className="text-gray-600 text-lg">{motivationalMessage}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Perfect playlists for your mood
            </h2>
            
            {canRequestMore && allPlaylists.length >= 3 && (
              <Button
                onClick={handleRequestMore}
                loading={loadingMore}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>More playlists</span>
              </Button>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {allPlaylists?.map((playlist: any, index: number) => (
              <motion.div
                key={`${playlist.url}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index % 3) * 0.1, duration: 0.6 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <img
                    src={playlist.imageUrl}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop";
                    }}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{playlist.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{playlist.description}</p>
                <a
                  href={playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-lavender-600 hover:text-lavender-700 font-medium"
                >
                  <span>Listen on Spotify</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center space-y-4"
        >
          {user ? (
            <div className="space-y-4">
              <Button
                onClick={handleSave}
                loading={saving}
                disabled={saved}
                variant="secondary"
                size="lg"
              >
                {saved ? 'Saved to your journal!' : 'Save this vibe to my journal'}
                <Save className="ml-2 h-5 w-5" />
              </Button>
              
              {saved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-600 font-medium"
                >
                  ✨ This vibe has been saved to your personal journal!
                </motion.div>
              )}
            </div>
          ) : (
            <div className="bg-lavender-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Want to save this vibe?
              </h3>
              <p className="text-gray-600 mb-4">
                Create an account to keep track of your mood discoveries
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </div>
          )}

          <div className="pt-8">
            <Link to="/describe">
              <Button variant="outline" size="lg">
                <Home className="mr-2 h-5 w-5" />
                Check another vibe
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm pt-4">
            <Heart className="h-4 w-4 text-blush-400 animate-pulse" />
            <span>This playlist might just get you through it 💜</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}