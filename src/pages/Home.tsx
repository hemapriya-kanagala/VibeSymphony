import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music, Heart, Sparkles, ArrowRight, Brain, Headphones, MessageCircle, Coffee, Lightbulb, Star } from 'lucide-react'
import { Button } from '../components/Button'

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <Music className="h-20 w-20 text-lavender-500 mx-auto mb-6" />
              </motion.div>
              <motion.div
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="h-7 w-7 text-mint-400" />
              </motion.div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                You know that feeling when{' '}
                <span className="bg-gradient-to-r from-lavender-600 via-mint-600 to-blush-600 bg-clip-text text-transparent">
                  you just can't find
                </span>{' '}
                the right music?
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We built this because sometimes you're feeling "tired but hopeful" or "happy but nostalgic" 
                and regular playlists just don't understand your vibe.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-6"
            >
              <Link to="/describe">
                <Button size="lg" className="group text-lg px-8 py-4">
                  Tell us how you're feeling
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-center space-x-2 text-gray-500 text-sm pt-4"
            >
              <Heart className="h-4 w-4 text-blush-400 animate-pulse" />
              <span className="italic">Because music often knows what we feel before we do</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Here's what we noticed about{' '}
              <span className="bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
                finding music
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                You spend way too much time scrolling through Spotify, trying to find something that matches 
                your exact mood. Maybe you're "anxiously excited about tomorrow" or feeling "nostalgic but ready 
                to move forward" – those complex emotions that don't fit into simple categories.
              </p>
              
              <p>
                The thing is, your feelings are way more nuanced than "happy" or "sad." You might be tired 
                but motivated, or peaceful but energized. Regular music apps just don't get these in-between 
                emotions that make you... well, you.
              </p>
              
              <div className="bg-gradient-to-r from-lavender-50 to-mint-50 rounded-2xl p-6 my-8">
                <p className="text-xl font-medium text-lavender-700 text-center">
                  So we thought: what if you could just describe your feelings in your own words, 
                  and something would actually understand and find the perfect music for that exact moment?
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              It's honestly{' '}
              <span className="bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
                pretty simple
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No complicated forms or endless categories. Just you, your feelings, and great music.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-lavender-100 to-lavender-200 rounded-3xl p-8 mb-6 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <MessageCircle className="h-16 w-16 text-lavender-600 mx-auto mb-4" />
                <div className="bg-lavender-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Just talk to us</h3>
                <p className="text-gray-600">
                  Type exactly how you're feeling – "overwhelmed but trying to stay positive" or whatever it is. 
                  No checkboxes, just real talk.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-mint-100 to-mint-200 rounded-3xl p-8 mb-6 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <Brain className="h-16 w-16 text-mint-600 mx-auto mb-4" />
                <div className="bg-mint-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">We understand</h3>
                <p className="text-gray-600">
                  Our AI reads between the lines and gets the complexity of what you're going through. 
                  It's like having a friend who really listens.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-gradient-to-br from-blush-100 to-blush-200 rounded-3xl p-8 mb-6 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <Headphones className="h-16 w-16 text-blush-600 mx-auto mb-4" />
                <div className="bg-blush-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Perfect match</h3>
                <p className="text-gray-600">
                  We find Spotify playlists that actually match your vibe. Not just close – 
                  that "how did they know exactly what I needed?" kind of perfect.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Why We Built This */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lavender-50 via-mint-50 to-blush-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why we actually{' '}
              <span className="bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
                built this thing
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Coffee className="h-6 w-6 text-lavender-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    We were tired of spending forever looking for the right music when we just wanted 
                    something that understood our mood. Like, really understood it.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-6 w-6 text-mint-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Sometimes you need music for your "Sunday evening melancholy" or your "nervous but 
                    excited energy before something big." Those specific feelings deserve specific playlists.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Star className="h-6 w-6 text-blush-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Music is personal. Your feelings are complex. We think your playlist recommendations 
                    should be too. That's literally it.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-lavender-100 to-mint-100 rounded-3xl p-8">
                  <Music className="h-20 w-20 text-lavender-600 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-800 italic">
                    "Finally, something that gets my weird, specific moods"
                  </p>
                  <p className="text-sm text-gray-600 mt-2">– Probably you, after trying this</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Ready to find music that{' '}
            <span className="bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
              actually gets you
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            No sign-up required. Just tell us how you're feeling and discover playlists that understand your vibe.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/describe">
              <Button size="lg" className="group text-xl px-12 py-6">
                Let's find your vibe
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-gray-500 text-sm mt-8"
          >
            <Heart className="h-4 w-4 text-blush-400 animate-pulse" />
            <span>Takes about 30 seconds, and you might just find your new favorite song</span>
            <Heart className="h-4 w-4 text-blush-400 animate-pulse" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}