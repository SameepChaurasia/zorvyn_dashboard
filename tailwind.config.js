import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
        serif: ['DM Serif Display', ...defaultTheme.fontFamily.serif],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        bg: {
          primary:   '#0d0f14',
          secondary: '#13151c',
          tertiary:  '#1a1d27',
        },
        surface: {
          DEFAULT: '#1e2130',
          hover:   '#252840',
        },
        accent: {
          DEFAULT: '#6c63ff',
          muted:   '#a78bfa',
        },
        border: {
          subtle: 'rgba(255,255,255,0.07)',
          base:   'rgba(255,255,255,0.13)',
        },
        ink: {
          primary:   '#f0f2ff',
          secondary: '#8b90a8',
          tertiary:  '#4a4f68',
        },
        positive: '#34d399',
        negative: '#f87171',
        warning:  '#fbbf24',
        info:     '#60a5fa',
        teal:     '#2dd4bf',
        violet:   '#a78bfa',
      },
      borderRadius: {
        card: '12px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}

