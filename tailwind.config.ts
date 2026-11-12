import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        'japan-red': '#E60012',
        'japan-flag': '#BC002D',
        'korea-flag': '#003478',
        brand: {
          blue: '#0A2540',
          red: '#E53E3E',
          green: '#25D366',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Oswald', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      scale: {
        '107': '1.07',
      },
      transitionDuration: {
        '400': '400ms',
        '700': '700ms',
      },
    },
  },
  plugins: [],
};

export default config;
