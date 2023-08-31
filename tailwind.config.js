const colors = require('tailwindcss/colors')
const { theme } = require('./node_modules/@alegradev/smile-ui-next/dist/theme')
const { proyect_name } = require('./config/index')

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: theme(colors),
  plugins: [],
  important: `.${proyect_name}`,
}
