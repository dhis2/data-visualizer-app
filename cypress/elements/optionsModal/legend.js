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

export const changeDisplayStyleToText = () =>
    cy
        .getBySel(optionsModalContentEl)
        .contains('Legend changes text color')
        .click()

export const expectLegendToBeEnabled = () =>
    cy.getBySel(optionsModalContentEl).should('contain', 'Legend type')

export const expectLegendDisplayStrategyToBeByDataItem = () =>
    cy
        .getBySel('legend-display-strategy-BY_DATA_ITEM')
        .find('[type="radio"]')
        .should('be.checked')

export const expectLegendDisplayStrategyToBeFixed = () =>
    cy
        .getBySel('legend-display-strategy-FIXED')
        .find('[type="radio"]')
        .should('be.checked')

export const expectLegendDisplayStyleToBeText = () =>
    cy
        .getBySel('legend-display-style-option-TEXT')
        .find('[type="radio"]')
        .should('be.checked')

export const expectLegendDisplayStyleToBeFill = () =>
    cy
        .getBySel('legend-display-style-option-FILL')
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
