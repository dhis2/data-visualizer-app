const titleCheckboxEl = 'RANGE_0-axis-title-checkbox'
const titleInputEl = 'RANGE_0-axis-title-input'
const rangeMinInputEl = 'RANGE_0-axis-range-min-input'
const rangeMaxInputEl = 'RANGE_0-axis-range-max-input'

export const enableVerticalAxisTitle = () =>
    cy
        .getBySel(titleCheckboxEl)
        .find('[type="checkbox"]')
        .check({ force: true }) // FIXME: Find another way to check the checkbox without force
        .should('be.checked')

export const setVerticalAxisTitle = text =>
    cy.getBySel(titleInputEl).find('input').type(text)

export const expectVerticalAxisTitleToBeValue = value =>
    cy
        .getBySel(titleInputEl)
        .find('input')
        .should('be.visible')
        .and('have.value', value)

export const setVerticalAxisRangeMinValue = value =>
    cy.getBySel(rangeMinInputEl).find('input').type(value)

export const expectVerticalAxisRangeMinToBeValue = value =>
    cy
        .getBySel(rangeMinInputEl)
        .find('input')
        .should('be.visible')
        .and('have.value', value)

export const setVerticalAxisRangeMaxValue = value =>
    cy.getBySel(rangeMaxInputEl).find('input').type(value)

export const expectVerticalAxisRangeMaxToBeValue = value =>
    cy
        .getBySel(rangeMaxInputEl)
        .find('input')
        .should('be.visible')
        .and('have.value', value)
