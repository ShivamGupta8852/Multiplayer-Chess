/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      mixBlendMode: {
        darken: 'darken',
      },
    },
  },
  variants: {
    extend: {
      mixBlendMode: ['responsive'],
    },
  },
  plugins: [],
}

