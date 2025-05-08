const optionsModalContentEl = 'options-modal-content'
const legendKeyOptionEl = 'option-legend-key'
const legendKeyEl = 'visualization-legend-key'
const legendKeyContainerEl = 'legend-key-container'
const legendKeyItemEl = 'legend-key-item'
const singleValueTextEl = 'visualization-primary-value'
const singleValueIconEl = 'visualization-icon'
const legendDisplayStrategyByDataItemEl = 'legend-display-strategy-BY_DATA_ITEM'
const legendDisplayStrategyFixedEl = 'legend-display-strategy-FIXED'
const legendDisplayStyleOptionTextEl = 'legend-display-style-option-TEXT'
const legendDisplayStyleOptionFillEl = 'legend-display-style-option-FILL'
const fixedLegendSetSelectEl = 'fixed-legend-set-select'
const fixedLegendSetOptionEl = 'fixed-legend-set-option'

export const toggleLegend = () =>
    cy
        .getBySel(optionsModalContentEl)
        .contains('Use legend for chart colors')
        .click()

export const changeDisplayStrategyToFixed = () =>
    cy.getBySel(optionsModalContentEl).contains('Select a legend').click()

export const changeDisplayStrategyToByDataItem = () =>
    cy
        .getBySel(optionsModalContentEl)
        .contains('Use pre-defined legend by data item')
        .click()

export const changeDisplayStyleToText = () =>
    cy
        .getBySel(optionsModalContentEl)
        .contains('Legend changes text color')
        .click()

export const changeDisplayStyleToFill = () =>
    cy
        .getBySel(optionsModalContentEl)
        .contains('Legend changes background color')
        .click()

export const expectLegendToBeEnabled = () =>
    cy.getBySel(optionsModalContentEl).should('contain', 'Legend type')

export const expectLegendDisplayStrategyToBeByDataItem = () =>
    cy
        .getBySel(legendDisplayStrategyByDataItemEl)
        .find('[type="radio"]')
        .should('be.checked')

export const expectLegendDisplayStrategyToBeFixed = () =>
    cy
        .getBySel(legendDisplayStrategyFixedEl)
        .find('[type="radio"]')
        .should('be.checked')

export const expectLegendDisplayStyleToBeText = () =>
    cy
        .getBySel(legendDisplayStyleOptionTextEl)
        .find('[type="radio"]')
        .should('be.checked')

export const expectLegendDisplayStyleToBeFill = () =>
    cy
        .getBySel(legendDisplayStyleOptionFillEl)
        .find('[type="radio"]')
        .should('be.checked')

export const changeFixedLegendSet = (legendSetName) => {
    cy.getBySel(fixedLegendSetSelectEl).findBySel('dhis2-uicore-select').click()
    cy.getBySel(fixedLegendSetOptionEl).containsExact(legendSetName).click()
}

export const expectFixedLegendSetToBe = (legendSetName) =>
    cy.getBySel(fixedLegendSetSelectEl).should('contain', legendSetName)

export const expectSingleValueToHaveTextColor = (color) =>
    cy.getBySel(singleValueTextEl).should('have.attr', 'fill', color)

export const expectSingleValueToHaveBackgroundColor = (color) =>
    cy.get('rect.highcharts-background').should('have.attr', 'fill', color)

export const expectSingleValueToHaveIconColor = (color) =>
    cy
        .getBySel(singleValueIconEl)
        .invoke('attr', 'style')
        .should('contain', `color: ${color}`)

export const toggleLegendKeyOption = () =>
    cy.getBySel(optionsModalContentEl).contains('Show legend key').click()

export const expectLegendKeyOptionToBeEnabled = () =>
    cy
        .getBySel(legendKeyOptionEl)
        .find('[type="checkbox"]')
        .should('be.checked')

export const expectLegendKeyOptionToBeDisabled = () =>
    cy
        .getBySel(legendKeyOptionEl)
        .find('[type="checkbox"]')
        .should('not.be.checked')

export const expectLegendKeyToBeHidden = () =>
    cy.getBySel(legendKeyEl).should('not.exist')

export const expectLegendKeyToBeVisible = () =>
    cy.getBySel(legendKeyEl).should('be.visible')

export const expectLegedKeyItemAmountToBe = (amount) =>
    cy
        .getBySel(legendKeyContainerEl)
        .findBySelLike(legendKeyItemEl)
        .should('have.length', amount)
