const dimensionsPanel = '.main-left'

export const selectDimension = dimensionName => {
    cy.get(dimensionsPanel)
        .contains(dimensionName)
        .click()
}
