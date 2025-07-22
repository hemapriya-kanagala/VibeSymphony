import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Music, Heart, Sparkles } from 'lucide-react'
import { Button } from '../components/Button'

export function About() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            What is{' '}
            <span className="bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
              VibeSymphony
            </span>
            ?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal mood-to-music translator that just gets you 💜
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl mb-12"
        >
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Sometimes you know exactly how you're feeling, but finding the right music to match that vibe? 
            That's where things get tricky. Maybe you're "tired but motivated" or "happy but nostalgic" — 
            those in-between feelings that don't fit into simple categories.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            That's where VibeSymphony comes in. You just tell us how you're feeling in your own words — 
            no checkboxes, no complicated forms. Our AI (powered by Google's Gemini) reads between the lines 
            and translates your mood into the perfect Spotify playlist search. Then we find you three playlists 
            that actually match what you're going through.
          </p>

          <div className="text-center">
            <blockquote className="text-2xl text-lavender-700 font-medium italic mb-4">
              "Because music often knows what we feel before we do." 🎵
            </blockquote>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="bg-lavender-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Brain className="h-12 w-12 text-lavender-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Understanding</h3>
            <p className="text-gray-600">
              Gemini AI reads your mood and finds the perfect musical match
            </p>
          </div>

          <div className="text-center">
            <div className="bg-mint-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Music className="h-12 w-12 text-mint-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Curated Playlists</h3>
            <p className="text-gray-600">
              Hand-picked Spotify playlists that actually get your vibe
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blush-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-12 w-12 text-blush-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Touch</h3>
            <p className="text-gray-600">
              Save your favorite mood discoveries for those similar days
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <Link to="/describe">
            <Button size="lg">
              Let's vibe
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}