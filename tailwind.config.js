/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      blue: 'var(--color-blue)',
      green: 'var(--color-green)',
      pink: 'var(--color-pink)',
      white: '#ffff',
      gray: '#F5F5F5',
      black: '#080808',
      transparent: 'rgba(0, 0, 0, 0)',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bgPrimary: 'var(--color-primary-bg)',
      },
    },
  },
  plugins: [],
}
