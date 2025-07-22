import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, ExternalLink, Calendar, Music, Heart, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '../components/Button'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import type { MoodReport } from '../types'

export function Dashboard() {
  const { user } = useAuth()
  const [reports, setReports] = useState<MoodReport[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean
    reportId: string | null
    reportTitle: string
  }>({
    isOpen: false,
    reportId: null,
    reportTitle: ''
  })

  useEffect(() => {
    if (user) {
      fetchReports()
    }
  }, [user])

  const fetchReports = async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('mood_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }
      
      // Transform the data to match our interface
      const transformedData = (data || []).map(report => ({
        id: report.id,
        user_id: report.user_id,
        mood_text: report.mood_text,
        vibe_title: report.vibe_title,
        motivational_message: report.motivational_message,
        playlist_links: Array.isArray(report.playlist_links) ? report.playlist_links : [],
        created_at: report.created_at,
        // Add aliases for easier access
        userId: report.user_id,
        moodText: report.mood_text,
        vibeTitle: report.vibe_title,
        motivationalMessage: report.motivational_message,
        playlistLinks: Array.isArray(report.playlist_links) ? report.playlist_links : [],
        createdAt: report.created_at
      }))
      
      setReports(transformedData)
    } catch (error) {
      setReports([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (reportId: string, reportTitle: string) => {
    setDeleteConfirm({
      isOpen: true,
      reportId,
      reportTitle
    })
  }

  const handleDeleteConfirm = async () => {
    const { reportId } = deleteConfirm
    if (!reportId || !user?.id) {
      console.error('Missing reportId or user ID:', { reportId, userId: user?.id })
      return
    }

    setDeleting(reportId)
    try {
      // First, let's verify the report exists and belongs to the user
      const { data: existingReport, error: fetchError } = await supabase
        .from('mood_reports')
        .select('id, user_id')
        .eq('id', reportId)
        .single()
      
      console.log('Existing report check:', { existingReport, fetchError, currentUserId: user.id })
      
      if (fetchError) {
        throw new Error(`Report not found: ${fetchError.message}`)
      }
      
      if (!existingReport) {
        throw new Error('Report does not exist')
      }
      
      if (existingReport.user_id !== user.id) {
        throw new Error('Report does not belong to current user')
      }
      
      console.log('Report verification passed, proceeding with deletion...')
      
      const { data, error } = await supabase
        .from('mood_reports')
        .delete()
        .eq('id', reportId)
        .eq('user_id', user.id)
        .select()

      if (error) {
        console.error('Supabase delete error:', error)
        throw error
      }
      
      console.log('Delete response:', { data, deletedCount: data?.length })
      
      if (data && data.length > 0) {
        // Successfully deleted, update local state
        setReports(prev => prev.filter(report => report.id !== reportId))
        console.log('Report removed from local state, remaining reports:', reports.length - 1)
      } else {
        console.warn('No rows were deleted despite no error')
        throw new Error('Delete operation completed but no rows were affected')
      }
      
      // Close dialog
      setDeleteConfirm({
        isOpen: false,
        reportId: null,
        reportTitle: ''
      })
      
    } catch (error) {
      console.error('Delete operation failed:', error)
      console.error('Error details:', {
        message: error.message,
        reportId,
        userId: user.id,
        reportExists: reports.find(r => r.id === reportId)
      })
      alert(`Failed to delete the report: ${error.message || 'Unknown error'}. Please check the console for details.`)
    } finally {
      setDeleting(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteConfirm({
      isOpen: false,
      reportId: null,
      reportTitle: ''
    })
  }

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return 'Unknown date'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Unknown date'
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return 'Unknown date'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Please sign in
          </h1>
          <p className="text-gray-600">
            You need to be logged in to view your mood journal
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <Music className="h-16 w-16 text-lavender-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading your mood journal...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Your{' '}
              <span className="bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
                Mood Journal
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Your personal collection of vibes and discoveries 🎵
            </p>
          </motion.div>

          {reports.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center py-16"
            >
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                No saved vibes yet
              </h2>
              <p className="text-gray-500 mb-8">
                Start your mood journey and save your favorite discoveries
              </p>
              <Button>
                <a href="/describe">Check your vibe</a>
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {reports.map((report, index) => {
                // Use both naming conventions for compatibility
                const moodText = report.mood_text || report.moodText || ''
                const vibeTitle = report.vibe_title || report.vibeTitle || 'Your Vibe'
                const motivationalMessage = report.motivational_message || report.motivationalMessage || ''
                const playlistLinks = report.playlist_links || report.playlistLinks || []
                const createdAt = report.created_at || report.createdAt || ''

                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(createdAt)}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-lavender-600 mb-2">
                          {vibeTitle}
                        </h3>
                        <p className="text-gray-600 italic mb-2">
                          "{moodText}"
                        </p>
                        <p className="text-gray-700">
                          {motivationalMessage}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteClick(report.id, vibeTitle)}
                        disabled={deleting === report.id}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete this mood report"
                      >
                        {deleting === report.id ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {playlistLinks && playlistLinks.length > 0 && (
                      <div className="grid md:grid-cols-3 gap-4">
                        {playlistLinks.map((playlist: any, playlistIndex: number) => (
                          <div
                            key={playlistIndex}
                            className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
                          >
                            <div className="aspect-square rounded-xl overflow-hidden mb-3">
                              <img
                                src={playlist.imageUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"}
                                alt={playlist.name || "Playlist"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop";
                                }}
                              />
                            </div>
                            <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                              {playlist.name || "Untitled Playlist"}
                            </h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {playlist.description || "A great playlist for your mood"}
                            </p>
                            {playlist.url && (
                              <a
                                href={playlist.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 text-sm text-lavender-600 hover:text-lavender-700 font-medium"
                              >
                                <span>Listen</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Custom Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Mood Report"
        message={`Are you sure you want to delete "${deleteConfirm.reportTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting === deleteConfirm.reportId}
      />
    </>
  )
}