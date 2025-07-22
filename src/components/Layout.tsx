import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Heart, User, LogOut, BookOpen, ChevronDown } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-mint-50 to-blush-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <Music className="h-8 w-8 text-lavender-600 group-hover:text-lavender-700 transition-colors" />
              <span className="text-2xl font-bold bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
                VibeSymphony
              </span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-lavender-600 transition-colors font-medium"
              >
                About
              </Link>
              
              {user && (
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-lavender-600 transition-colors font-medium"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>My Journal</span>
                </Link>
              )}
              
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-lavender-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium max-w-32 truncate">{user.email}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-lavender-600 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-lavender-500 to-mint-500 text-white px-4 py-2 rounded-full hover:from-lavender-600 hover:to-mint-600 transition-all duration-300 font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-white/50 backdrop-blur-md mt-6 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1 text-gray-600">
              <span className="text-sm italic">"Because music often knows what we feel before we do"</span>
            </div>
            <div className="flex items-center justify-center space-x-1 text-gray-500">
              <Heart className="h-4 w-4 text-blush-400 animate-pulse" />
              <span className="text-sm">Made with love for your vibes</span>
              <Heart className="h-4 w-4 text-blush-400 animate-pulse" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}