import ENVS from '../../environment.json'

const VUE_APP_ENVIRONMENT: keyof typeof ENVS = Cypress.env('VUE_APP_ENVIRONMENT') || 'testing'

export const API_URL_AUTH = {
  testing: 'https://almost-auth-api.alegra.com/v1/user/token',
  production: 'https://auth-api.alegra.com/v1/user/token',
}[VUE_APP_ENVIRONMENT]

export const API_URL = ENVS[VUE_APP_ENVIRONMENT].BASE_API_URL

export const NAME_COOKIE_TOKEN_JWT = ENVS[VUE_APP_ENVIRONMENT].COOKIE_TOKEN

export const NAME_COOKIE_TOKEN_BASIC = {
  testing: 'al-test-days-of-thunder',
  production: 'al-days-of-thunder',
}[VUE_APP_ENVIRONMENT]

export enum COUNTRY {
  CRI = 'CRI',
}

export const ACCOUNTS_TEST: Record<COUNTRY, { email: string; password: string }> = {
  testing: {
    CRI: {
      email: '',
      password: '',
    },
  },
  production: {
    CRI: {
      email: '',
      password: '',
    },
  },
}[VUE_APP_ENVIRONMENT]
