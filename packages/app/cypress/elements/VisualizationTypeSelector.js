const visTypeSelector = '*[class^="VisualizationTypeSelector_listContainer"]'
const visTypeSelectorButton = '*[class^="VisualizationTypeSelector"]'
const visTypeSelectorButtonText = 'vst-button-text'
const defaultVisTypeName = 'Column'

export const clickVisTypeSelector = () => {
    cy.get(visTypeSelectorButton).click()
}

export const changeVisType = visTypeName => {
    clickVisTypeSelector()
    cy.get(visTypeSelector)
        .contains(visTypeName)
        .click()
    expectVisTypeToBeValue(visTypeName)
}

export const expectVisTypeToBeValue = value =>
    cy.getBySel(visTypeSelectorButtonText).should(elem => {
        expect(elem.text()).to.equal(value)
    })

export const expectVisTypeToBeDefault = () =>
    cy.getBySel(visTypeSelectorButtonText).should(elem => {
        expect(elem.text()).to.equal(defaultVisTypeName)
    })
