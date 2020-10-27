Cypress.Commands.add('getReduxState', prop => {
    cy.window()
        .its('store')
        .invoke('getState')
        .its(prop)
})
