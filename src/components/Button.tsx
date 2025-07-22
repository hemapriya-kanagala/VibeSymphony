import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-lavender-500 to-mint-500 text-white hover:from-lavender-600 hover:to-mint-600 focus:ring-lavender-300 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-blush-400 to-lavender-400 text-white hover:from-blush-500 hover:to-lavender-500 focus:ring-blush-300 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-lavender-300 text-lavender-600 hover:bg-lavender-50 focus:ring-lavender-300'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
        (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  )
}