/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // supports dark/light switching
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        garage: {
          light: '#f4f4f5',
          dark: '#0f0f0f',
          primary: '#00BFA6',
          accent: '#FF416C',
          bg3d: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        'nav-height': '64px',
        'sidebar-width': '280px',
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-in-out',
        scaleUp: 'scaleUp 0.3s ease-in-out',
        slideUp: 'slideUp 0.5s ease-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      boxShadow: {
        '3d-soft': '0 8px 30px rgba(0, 0, 0, 0.35)',
        'glass': '0 4px 30px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),     // better form styles
    require('@tailwindcss/typography'),// prose
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),     // optional for studio scrollbars
  ],
}
