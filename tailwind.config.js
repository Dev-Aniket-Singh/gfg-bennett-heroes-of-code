/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030406',
          900: '#050608',
          850: '#080A0D',
          800: '#0c0f14',
          700: '#141820',
          600: '#1c222c',
          500: '#2c3545',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-bright': 'rgba(255, 255, 255, 0.18)',
        },
        gfg: {
          green: '#00DF81',
          emerald: '#00B86B',
          glow: 'rgba(0, 223, 129, 0.35)',
          muted: '#18382B',
        },
        marvel: {
          red: '#E62429',
          crimson: '#C4151B',
          amber: '#FFB800',
          gold: '#FFD700',
          blue: '#00D2FF',
          electric: '#00F0FF',
          violet: '#8A2BE2',
          purple: '#6C2BD9',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Outfit"', 'sans-serif'],
        body: ['"Outfit"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'subtle-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-gfg': '0 0 25px -5px rgba(0, 223, 129, 0.3)',
        'glow-amber': '0 0 30px -5px rgba(255, 184, 0, 0.35)',
        'glow-red': '0 0 30px -5px rgba(230, 36, 41, 0.35)',
        'glow-blue': '0 0 30px -5px rgba(0, 210, 255, 0.35)',
        'hud-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse-slow': 'spin-reverse 22s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
