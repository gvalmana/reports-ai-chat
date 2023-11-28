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
  proyect_port: 1026,
  proyect_name: 'app_alegra_template',
  prefixEnvironment: getEnvironmentPrefix(),
}
