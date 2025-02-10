const errorContainerEl = 'visualization-error-container'

export const expectErrorToContainTitle = (errorTitle) =>
    cy.getBySel(errorContainerEl).should('contain', errorTitle)
