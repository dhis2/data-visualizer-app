const titleCheckboxEl = 'option-vertical-axis-title-checkbox'
const titleInputEl = 'option-vertical-axis-title-input'
const rangeMinInputEl = 'option-vertical-axis-range-min-input'
const rangeMaxInputEl = 'option-vertical-axis-range-max-input'

export const enableVerticalAxisTitle = () =>
    cy
        .getBySel(titleCheckboxEl)
        .find('[type="checkbox"]')
        .check({ force: true })
        .should('be.checked')

export const setVerticalAxisTitle = text =>
    cy
        .getBySel(titleInputEl)
        .find('input')
        .type(text)

export const expectVerticalAxisTitleToBeValue = value =>
    cy
        .getBySel(titleInputEl)
        .find('input')
        .should('be.visible')
        .and('have.value', value)

export const setVerticalAxisRangeMinValue = value =>
    cy
        .getBySel(rangeMinInputEl)
        .find('input')
        .type(value)

export const expectVerticalAxisRangeMinToBeValue = value =>
    cy
        .getBySel(rangeMinInputEl)
        .find('input')
        .should('be.visible')
        .and('have.value', value)

export const setVerticalAxisRangeMaxValue = value =>
    cy
        .getBySel(rangeMaxInputEl)
        .find('input')
        .type(value)

export const expectVerticalAxisRangeMaxToBeValue = value =>
    cy
        .getBySel(rangeMaxInputEl)
        .find('input')
        .should('be.visible')
        .and('have.value', value)
