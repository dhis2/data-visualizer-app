const vstCardEl = 'visualization-type-selector-card'
const vstButtonEl = 'visualization-type-selector-button'
const vstButtonTextEl = 'visualization-type-selector-currently-selected-text'
const defaultVisTypeName = 'Column'

export const clickVisTypeSelector = () => {
    cy.getBySel(vstButtonEl).click()
}

export const changeVisType = visTypeName => {
    clickVisTypeSelector()
    cy.getBySel(vstCardEl)
        .contains(visTypeName)
        .click()
    expectVisTypeToBeValue(visTypeName)
}

export const expectVisTypeToBeValue = value =>
    cy.getBySel(vstButtonTextEl).should(elem => {
        expect(elem.text()).to.equal(value)
    })

export const expectVisTypeToBeDefault = () =>
    cy.getBySel(vstButtonTextEl).should(elem => {
        expect(elem.text()).to.equal(defaultVisTypeName)
    })
