const dimensionsPanel = '.main-left'

export const openDimension = dimensionName => {
    cy.get(dimensionsPanel)
        .contains(dimensionName)
        .click()
}

export const removeDimension = dimensionName => {
    // TODO: Implement removing the dim from the layout
    cy.get(dimensionsPanel)
        .contains(dimensionName)
        .click()
}
