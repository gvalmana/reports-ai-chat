/// <reference types="cypress" />

Cypress.Commands.add('gdt', selector => {
  return cy.get(`[data-test="${selector}"]`)
})
