import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginVue } from '@rsbuild/plugin-vue'
import { prefixEnvironment, proyect_name, proyect_port } from './config'
import { name, dependencies } from './package.json'

const publicPath = process.env.VUE_APP_DOMAIN
const { publicVars } = loadEnv({ prefixes: ['VUE_APP_'] })

const moduleFederationOptions = {
  name: proyect_name,
  filename: 'remoteEntry.js',
  remotes: {
    app_alegra_commons: `app_alegra_commons@https://${prefixEnvironment}alegra-commons.alegra.com/remoteEntry.js?v=[('0' + (new Date().getMonth()+1)).slice(-2)+('0'+new Date().getDate()).slice(-2)+new Date().getHours()]`,
  },
  exposes: {
    './microfront': './src/micro/mount',
  },
  shared: {
    'lodash-es': { singleton: true, requiredVersion: '4.17.21' },
    pinia: { singleton: true, requiredVersion: '2.0.14' },
    vue: { singleton: true, requiredVersion: '3.4.21' },
    'vue-router': { singleton: true, requiredVersion: '4.3.0' },
    '@alegradev/smile-ui-next': dependencies['@alegradev/smile-ui-next'],
  },
}

export default defineConfig({
  plugins: [pluginSass(), pluginVue()],
  html: {
    title: name,
    template: 'public/index.html',
  },
  server: {
    host: 'dev.alegra.com',
    port: proyect_port,
  },
  output: {
    distPath: {
      js: 'template-assets/js',
      jsAsync: 'template-assets/js',
      css: 'template-assets/css',
      cssAsync: 'template-assets/css',
      image: 'template-assets/img',
      font: 'template-assets/fonts',
    },
  },
  source: {
    define: publicVars,
  },
  tools: {
    rspack: {
      output: {
        publicPath: publicPath ? publicPath : 'auto',
      },
    },
  },
  moduleFederation: {
    options: moduleFederationOptions,
  },
})
