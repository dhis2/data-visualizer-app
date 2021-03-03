const titleCheckboxEl = 'axis-title-checkbox'
const titleInputEl = 'axis-title-input'
const rangeMinInputEl = 'axis-range-min-input'
const rangeMaxInputEl = 'axis-range-max-input'

const getAxisSelector = (axis, selector) => `${axis}-${selector}`

export const enableAxisTitle = axis =>
    cy
        .getBySel(getAxisSelector(axis, titleCheckboxEl))
        .click()
        .find('[type="checkbox"]')
        .should('be.checked')

export const setAxisTitle = (axis, text) =>
    cy.getBySel(getAxisSelector(axis, titleInputEl)).find('input').type(text)

export const expectAxisTitleToBeValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, titleInputEl))
        .find('input')
        .scrollIntoView()
        .should('be.visible')
        .and('have.value', value)

export const setAxisRangeMinValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, rangeMinInputEl))
        .find('input')
        .type(value)

export const expectAxisRangeMinToBeValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, rangeMinInputEl))
        .find('input')
        .should('be.visible')
        .and('have.value', value)

export const setAxisRangeMaxValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, rangeMaxInputEl))
        .find('input')
        .type(value)

export const expectAxisRangeMaxToBeValue = (axis, value) =>
    cy
        .getBySel(getAxisSelector(axis, rangeMaxInputEl))
        .find('input')
        .should('be.visible')
        .and('have.value', value)
