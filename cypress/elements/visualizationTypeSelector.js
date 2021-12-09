const vstCardEl = 'visualization-type-selector-card'
const vstButtonEl = 'visualization-type-selector-button'
const vstButtonTextEl = 'visualization-type-selector-currently-selected-text'
const defaultVisTypeName = 'Column'

export const clickVisTypeSelector = () => cy.getBySel(vstButtonEl).click()

export const changeVisType = (visTypeName) => {
    clickVisTypeSelector()
    cy.getBySel(vstCardEl).contains(visTypeName).click()
}

export const expectVisTypeToBeValue = (value) =>
    cy
        .getBySel(vstButtonTextEl)
        .contains(value)
        .should('have.length', 1)
        .and('be.visible')

export const expectVisTypeToBeDefault = () =>
    cy
        .getBySel(vstButtonTextEl)
        .contains(defaultVisTypeName)
        .should('have.length', 1)
        .and('be.visible')
