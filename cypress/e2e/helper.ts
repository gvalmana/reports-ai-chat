import {
  ACCOUNTS_TEST,
  API_URL_AUTH,
  COUNTRY,
  NAME_COOKIE_TOKEN_BASIC,
  NAME_COOKIE_TOKEN_JWT,
} from './constants'
import { createTokenBasic } from './utils'

export function fetchGetTokeUserByEmailAndPassword(email: string, password: string) {
  return cy.request('POST', API_URL_AUTH, { email, password })
}

export function initLoginAppAlegra(country: COUNTRY) {
  const email = ACCOUNTS_TEST[country].email
  const password = ACCOUNTS_TEST[country].password

  fetchGetTokeUserByEmailAndPassword(email, password).then(response => {
    expect(response.status).to.eq(200)
    const token = response.body.accessToken
    const tokenBasic = createTokenBasic(token)
    cy.setCookie(NAME_COOKIE_TOKEN_BASIC, tokenBasic)
    cy.setCookie(NAME_COOKIE_TOKEN_JWT, token)
  })
}
