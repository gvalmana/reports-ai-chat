const colors = require('tailwindcss/colors')
const { theme } = require('@alegradev/smile-ui-next')
const { proyect_name } = require('./config/index')

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: theme(colors),
  plugins: [],
  important: `.${proyect_name}`,
}
