import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        greenblue: {
          400: 'rgb(0, 100, 120)',
          500: 'rgb(0, 100, 100)',
          600: 'rgb(0, 100, 80)',
        },
        black: {
          300: 'rgb(64, 64, 64)',
          400: 'rgb(43, 43, 43)',
          500: 'rgb(22, 22, 22)',
          600: 'rgb(0, 0, 0)',
        },
        puple: {
          600: 'rgb(82, 5, 123)',
          500: 'rgb(137, 44, 220)',
          400: 'rgb(188, 111, 241)',

        },
        green: {
          600: 'rgb(81, 218, 76)',

        },
        cyan: {
          600: 'rgb(80, 200, 200)',
          500: 'rgb(100, 223, 223)',

        },
        red: {
          600: 'rgb(220, 72, 72)',
          500: 'rgb(255, 72, 72)',
        
        },
        pink: {
          500: 'rgb(242, 17, 112)',

        },

        grey: {
          50: 'rgb(249, 249, 249)',

        },

      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
