const visTypeSelector = '*[class^="VisualizationTypeSelector_listContainer"]'
const visTypeSelectorButton = '*[class^="VisualizationTypeSelector"]'
const visTypeSelectorButtonText = '[data-test="vst-button-text"]'
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
    cy.get(visTypeSelectorButtonText).should(elem => {
        expect(elem.text()).to.equal(value)
    })

export const expectVisTypeToBeDefault = () =>
    cy.get(visTypeSelectorButtonText).should(elem => {
        expect(elem.text()).to.equal(defaultVisTypeName)
    })
