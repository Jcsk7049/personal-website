/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          blue:      '#0071E3',
          text:      '#1D1D1F',
          secondary: '#6E6E73',
          tertiary:  '#86868B',
          separator: '#E5E5EA',
          bg:        '#F5F5F7',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      animation: {
        blink:        'blink 1s step-end infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
      },
      borderRadius: {
        '2xl':  '1rem',
        '3xl':  '1.5rem',
        '4xl':  '2rem',
      },
      boxShadow: {
        'card':       '0 1px 4px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
