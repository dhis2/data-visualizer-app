const optionsModalContentEl = 'options-modal-content'

export const enableLegend = () =>
    cy
        .getBySel(optionsModalContentEl)
        .contains('Use legend for chart colors')
        .click()

export const changeDisplayStrategyToFixed = () =>
    cy
        .getBySel(optionsModalContentEl)
        .contains('Select a single legend for the entire visualization')
        .click()

export const expectLegendToBeEnabled = () =>
    cy.getBySel(optionsModalContentEl).should('contain', 'Legend type')

export const expectLegendDisplayStrategyToBeByDataItem = () =>
    cy
        .getBySel('legend-display-strategy-by-data-item')
        .find('[type="radio"]')
        .should('be.checked')

export const expectLegendDisplayStrategyToBeFixed = () =>
    cy
        .getBySel('legend-display-strategy-fixed')
        .find('[type="radio"]')
        .should('be.checked')

export const changeFixedLegendSet = legendSetName => {
    cy.getBySel('fixed-legend-set-select')
        .findBySel('dhis2-uicore-select')
        .click()
    cy.getBySel('fixed-legend-set-option').containsExact(legendSetName).click()
}

export const expectFixedLegendSetToBe = legendSetName =>
    cy.getBySel('fixed-legend-set-select').should('contain', legendSetName)
