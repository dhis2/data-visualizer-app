const getTextAlignSelectEl = (prefix) =>
    `${prefix}-text-style-text-align-select`
const getTextAlignOptionEl = (prefix) =>
    `${prefix}-text-style-text-align-option`
const getFontSizeSelectEl = (prefix) => `${prefix}-text-style-font-size-select`
const getFontSizeOptionEl = (prefix) => `${prefix}-text-style-font-size-option`
const getBoldButtonEl = (prefix) => `${prefix}-text-style-bold-toggle`
const getItalicButtonEl = (prefix) => `${prefix}-text-style-italic-toggle`
const getColorButtonEl = (prefix) => `${prefix}-text-style-text-color-picker`

export const changeTextAlignOption = (prefix, optionName) => {
    cy.getBySel(getTextAlignSelectEl(prefix)).click()
    cy.getBySelLike(getTextAlignOptionEl(prefix)).contains(optionName).click()
}

export const changeFontSizeOption = (prefix, optionName) => {
    cy.getBySel(getFontSizeSelectEl(prefix)).click()
    cy.getBySelLike(getFontSizeOptionEl(prefix))
        .containsExact(optionName)
        .click()
}

export const clickBoldButton = (prefix) =>
    cy.getBySel(getBoldButtonEl(prefix)).click()

export const clickItalicButton = (prefix) =>
    cy.getBySel(getItalicButtonEl(prefix)).click()

export const changeColor = (prefix, color) => {
    cy.getBySelLike(getColorButtonEl(prefix))
        .find('input[type=color]')
        .invoke('val', color)
        .trigger('input', { force: true }) // use force as the input has style "pointer-events: none"
        .invoke('attr', 'value')
        .should('eq', color)
}
