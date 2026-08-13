/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./safety-advisor.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        primary: {
            DEFAULT: '#1B2E5E',
            50: '#F5F7FA',
            100: '#E6EBF5',
            500: '#1B2E5E',
            600: '#15254D',
            900: '#0B1530'
        },
        accent: {
            DEFAULT: '#d4af37',
            light: '#f3e5ab',
            dark: '#aa7c11'
        },
        surface: '#FFFFFF',
        background: '#F8FAFC'
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 46, 94, 0.08)',
        'glow': '0 0 15px rgba(14, 165, 233, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
