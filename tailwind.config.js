const { theme } = require('@alegradev/smile-ui-next')
const { proyect_name } = require('./config/index')

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts}'],
  theme: theme(),
  plugins: [],
  important: `.${proyect_name}`,
}
