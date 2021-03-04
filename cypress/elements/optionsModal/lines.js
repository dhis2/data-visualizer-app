const trendLineCheckboxEl = 'option-trend-line-checkbox'
const trendLineSelectEl = 'option-trend-line-select'
const trendLineSelectOptionEl = 'option-trend-line-option'
const targetLineCheckboxEl = 'option-target-line-checkbox'
const targetLineValueInputEl = 'option-target-line-value-input'
const targetLineLabelInputEl = 'option-target-line-label-input'

export const clickTrendLineCheckbox = () =>
    cy
        .getBySel(trendLineCheckboxEl)
        .click()
        .find('[type="checkbox"]')
        .should('be.checked')

export const selectTrendLineType = optionName => {
    cy.getBySel(trendLineSelectEl).findBySel('dhis2-uicore-select').click()
    cy.getBySel(trendLineSelectOptionEl).contains(optionName).click()
}

export const clickTargetLineCheckbox = () =>
    cy
        .getBySel(targetLineCheckboxEl)
        .click()
        .find('[type="checkbox"]')
        .should('be.checked')

export const setTargetLineValue = text =>
    cy.getBySel(targetLineValueInputEl).find('input').type(text)

export const setTargetLineLabel = text =>
    cy.getBySel(targetLineLabelInputEl).find('input').type(text)
