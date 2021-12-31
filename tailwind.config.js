module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse-full': {
          '0%, 100%': {
            opacity: 1
          },
          '50%': {
            opacity: 0
          }
        }
      }
    },
    animation: {
      'pulse-full': 'pulse-full 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;'
    },
  },
  plugins: [],
}
