import { COUNTRY } from './constants'
import { initLoginAppAlegra } from './helper'

beforeEach(() => {
  cy.intercept('GET', '**/v1/users/self**').as('get-user-self')
})

it('visit page and load HTTP requests', () => {
  initLoginAppAlegra(COUNTRY.CRI)
  cy.visit('/')

  cy.wait('@get-user-self').its('response.statusCode').should('eq', 200)
  cy.get('button').contains('Guardar').click()
  cy.location('pathname').should('eq', '/configuration/about')
})
