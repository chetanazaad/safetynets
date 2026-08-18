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
            DEFAULT: '#0EA5E9',
            light: '#38BDF8',
            dark: '#0284C7'
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
