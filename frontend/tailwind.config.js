/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        'verqor-color': '#2F487C', // Agrega esta línea
      },
    },
  },
  plugins: [],
}