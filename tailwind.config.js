/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
       fontNunito: ['Nunito', 'sans-serif'],
       fontDancingScript: ['Dancing Script', 'cursive'],
       fontRoboto: ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        bg_color: '#2e302e',
        icons_color: '#ba4f41',
        text_color1: '#6474ac',
        text_color2: '#816c52',
        text_color3: '#5e4d40'
      }
    },
    
  },
  plugins: [
    require('@tailwindcss/forms', '@tailwindcss/aspect-ratio'),
    
  ],
}

