import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060E18',
          900: '#0C1B2A',
          800: '#142D45',
          700: '#1B3A5C',
          600: '#234B73',
          500: '#2B5F8E',
          400: '#3D7AB3',
          300: '#6A9DCB',
          200: '#A3C4E0',
          100: '#D4E3F0',
          50: '#EDF3F9',
        },
        copper: {
          900: '#5C3415',
          800: '#7A4520',
          700: '#8B5A2B',
          600: '#A06830',
          500: '#B87333',
          400: '#CD8E52',
          300: '#D4A574',
          200: '#E4C8A8',
          100: '#F0DFC8',
          50: '#FAF3EB',
        },
        warm: {
          950: '#1A1714',
          900: '#2D2924',
          800: '#4A4440',
          700: '#6B645E',
          600: '#8B837C',
          500: '#A9A19A',
          400: '#B8AFA6',
          300: '#D1CBC4',
          200: '#E8E2DA',
          100: '#F5F1EC',
          50: '#FAFAF8',
        },
        emergency: {
          600: '#A02020',
          500: '#C42B2B',
          400: '#E04040',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'copper-gradient': 'linear-gradient(135deg, #B87333 0%, #D4A574 50%, #B87333 100%)',
        'navy-gradient': 'linear-gradient(180deg, #0C1B2A 0%, #1B3A5C 100%)',
        'hero-texture': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(184, 115, 51, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(184, 115, 51, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
