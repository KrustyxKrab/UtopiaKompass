/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'utopia-yellow': '#E8DE74',
        'utopia-blue': '#C8E0F4',
        'utopia-dark': '#1E3A52',
        'utopia-orange': '#F4A261',
      },
      fontFamily: {
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}