/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // KYNYX palette — near-black canvas, off-white type, signature lime accent
        ink: {
          DEFAULT: '#08080B',
          deep: '#050507',
          raised: '#0E0E13',
          panel: '#131318',
          line: '#232329',
        },
        mist: {
          DEFAULT: '#F4F4F1',
          dim: '#C9C9C6',
        },
        ash: {
          DEFAULT: '#8E8E98',
          deep: '#7C7C86', // ≥ 4.5:1 on ink (AA for small text)
        },
        signal: {
          DEFAULT: '#C6FF3E',
          soft: '#D8FF6E',
          deep: '#A6E61F',
          dim: 'rgba(198,255,62,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.06em',
        tight: '-0.03em',
        widest: '0.22em',
      },
      maxWidth: {
        shell: '1600px',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(198,255,62,0.35)',
        card: '0 24px 80px -32px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(to right, rgba(244,244,241,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,244,241,0.05) 1px, transparent 1px)',
        'grid-lines-signal':
          'linear-gradient(to right, rgba(198,255,62,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(198,255,62,0.08) 1px, transparent 1px)',
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        'marquee-slow': 'marquee 55s linear infinite',
        'marquee-reverse': 'marquee-reverse 48s linear infinite',
        'pulse-soft': 'pulse-soft 3.2s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        'blink-dot': 'blink-dot 1.6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'blink-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
    },
  },
  plugins: [],
};
