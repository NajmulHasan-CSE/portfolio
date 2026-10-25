/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#151b16',
          900: '#1b231c',
          800: '#253128',
          700: '#344638',
        },
        sky: {
          300: '#a7c6ae',
          400: '#7fa889',
          500: '#527b5d',
          600: '#3f654a',
          700: '#31523b',
        },
        blue: {
          300: '#a7c6ae',
          400: '#7fa889',
          500: '#527b5d',
          600: '#3f654a',
          700: '#31523b',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        glow: '0 10px 30px -10px rgba(63, 101, 74, 0.3)',
      },
    },
  },
  plugins: [],
};
