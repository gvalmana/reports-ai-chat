import { defineConfig } from 'cypress'
import { proyect_port } from './config'

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${proyect_port}`,
    retries: { runMode: 3, openMode: 3 },
    requestTimeout: 30000,
    responseTimeout: 30000,
    video: false,
    screenshotOnRunFailure: false,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  env: {
    VUE_APP_ENVIRONMENT: process.env.VUE_APP_ENVIROMENT,
  },
})
