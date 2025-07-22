import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from './Button'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 rounded-full p-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1"
                >
                  {cancelText}
                </Button>
                <Button
                  onClick={onConfirm}
                  loading={loading}
                  disabled={loading}
                  className="flex-1 bg-red-500 hover:bg-red-600 focus:ring-red-300"
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}