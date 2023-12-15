declare namespace Cypress {
  interface Chainable {
    /**
     * Get an element by data-test attribute.
     * @example cy.gdt('button:delete')
     * @param {string} selector - The data-test attribute.
     * @returns {Chainable<JQuery<HTMLElement>>}
     */
    gdt(selector: string): Chainable<JQuery<HTMLElement>>
  }
}
