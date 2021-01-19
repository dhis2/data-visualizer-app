const trendLineCheckboxEl = 'option-trend-line-checkbox'
const trendLineSelectEl = 'option-trend-line-select'
const trendLineSelectOptionEl = 'option-trend-line-option'

export const enableTrendLine = () =>
    cy
        .getBySel(trendLineCheckboxEl)
        .find('[type="checkbox"]')
        .check({ force: true })
        .should('be.checked')

export const selectTrendLineType = optionName => {
    cy.getBySel(trendLineSelectEl).findBySel('dhis2-uicore-select').click()
    cy.getBySel(trendLineSelectOptionEl).contains(optionName).click()
}
