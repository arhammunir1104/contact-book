/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
      custom_white: '#F5F5F5',
      custom_green: "#B9E937",
      custom_dark_green : "#00B906",
      custom_dark : "#424242",
      custom_grey : "#31363F"
  },
}
  }
}