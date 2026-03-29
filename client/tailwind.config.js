/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      colors: {
        earth: {
          50:  '#fdf6ec', 100: '#f9e8cc', 200: '#f2d9b0',
          300: '#e8ac58', 400: '#dc8e2e', 500: '#c47318',
          600: '#9e5912', 700: '#7a4210', 800: '#5f3310', 900: '#3d200a',
        },
        moss: {
          50:  '#f2f8f0', 100: '#dff0d8', 200: '#b8e0a8',
          300: '#82c96a', 400: '#55ae3a', 500: '#3a8f25',
          600: '#2b721c', 700: '#225717', 800: '#1a4212', 900: '#0f280a',
        },
        clay: {
          50:  '#fdf4f2', 100: '#fae4de', 200: '#f5c4b6',
          300: '#ed9880', 400: '#e16d50', 500: '#c84e32',
          600: '#a33928', 700: '#7d2a1d', 800: '#5c1e15', 900: '#3a120d',
        },
      },
      animation: {
        'fade-in':  'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'grow':     'grow 1.1s cubic-bezier(.22,1,.36,1) forwards',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 },                                  to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' },   to: { opacity: 1, transform: 'translateY(0)' } },
        grow:    { from: { width: '0%' },                                  to: { width: 'var(--w)' } },
      },
    },
  },
  plugins: [],
}
