const typeRadioEl = 'option-chart-subtitle-type-radios'
const textEl = 'option-chart-subtitle-text-input'
const customOption = 'Custom'

export const setCustomSubtitle = text => {
    cy.getBySel(typeRadioEl).contains(customOption).click()
    cy.getBySel(textEl).find('input').type(text)
}
