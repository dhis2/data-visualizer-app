const titleCheckboxEl = 'option-vertical-axis-title-checkbox'
const titleInputEl = 'option-vertical-axis-title-input'

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
