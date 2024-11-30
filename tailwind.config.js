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
      charcoal: '#383838',
      black: '#080808',
      transparent: 'rgba(0, 0, 0, 0)',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        hover: 'var(--color-hover)',
        bgPrimary: 'var(--color-primary-bg)',
      },
      dropShadow: {
        blue: '5px 5px 20px rgba(31, 25, 251, 0.80)',
        green: '5px 5px 20px rgba(44, 242, 207, 0.80)',
        pink: '5px 5px 20px rgba(249, 58, 252, 0.80)',
      },
      fontFamily: {
        amiko: ['Amiko', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
