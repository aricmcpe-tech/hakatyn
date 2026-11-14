/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#070a13',
          900: '#0b1120',
          850: '#111827',
          800: '#1e293b',
          750: '#273549',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
        },
        quasar: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          accent: '#00e5ff',
        },
        nova: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 10px 30px -4px rgba(6, 182, 212, 0.15)',
        'quasar-glow': '0 0 20px -2px rgba(6, 182, 212, 0.35)',
        'modal': '0 20px 40px -8px rgba(0, 0, 0, 0.8)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      }
    },
  },
  plugins: [],
}
