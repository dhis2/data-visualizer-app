Cypress.Commands.add('getReduxState', prop => {
    cy.window()
        .its('store')
        .invoke('getState')
        .its(prop)
})

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args)
})
