const windowTitleDefault = 'Data Visualizer | DHIS2'

export const expectWindowTitleToBeDefault = () =>
    cy.title().should('equal', windowTitleDefault)
