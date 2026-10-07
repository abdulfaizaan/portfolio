/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { primary: '#580EF6' },
      fontFamily: { sans: ['Poppins', 'sans-serif'] },
      container: {
        padding: '1rem',
        screens: {
          '375px': '375px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [],
}
