export const expectStoreCurrentToHaveColumnsLength = length =>
    cy
        .getReduxState('current')
        .its('columns')
        .should('have.length', length)

export const expectStoreCurrentToBeEmpty = () =>
    cy.getReduxState('current').should('be.null')
