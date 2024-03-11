function getEnvironmentPrefix() {
  const appEnvironment = String(process.env.VUE_APP_ENVIROMENT).toLowerCase()

  switch (appEnvironment) {
    case 'production':
      return ''
    case 'sandbox':
      return 'sandbox-'
    default:
      return 'almost-'
  }
}

module.exports = {
  proyect_port: 1032,
  proyect_name: 'app_alegra_pdf_customization_engine',
  prefixEnvironment: getEnvironmentPrefix(),
}
