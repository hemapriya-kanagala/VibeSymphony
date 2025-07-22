/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#f8f6ff',
          100: '#f0ebff',
          200: '#e4d9ff',
          300: '#d1bdff',
          400: '#b898ff',
          500: '#9b70ff',
          600: '#8347ff',
          700: '#7231ed',
          800: '#5e23c7',
          900: '#4e1ea3',
        },
        mint: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        blush: {
          50: '#fef7f7',
          100: '#fdeeed',
          200: '#fbdddd',
          300: '#f7c0c0',
          400: '#f19898',
          500: '#e87171',
          600: '#d94e4e',
          700: '#b73737',
          800: '#983131',
          900: '#7f2e2e',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}