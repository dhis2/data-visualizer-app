const getTextAlignSelectElByType = type =>
    `option-chart-${type}-text-style-text-align-select`
const getTextAlignOptionElByType = type =>
    `option-chart-${type}-text-style-text-align-option`
const getFontSizeSelectElByType = type =>
    `option-chart-${type}-text-style-font-size-select`
const getFontSizeOptionElByType = type =>
    `option-chart-${type}-text-style-font-size-option`
const getBoldButtonElByType = type =>
    `option-chart-${type}-text-style-bold-toggle`
const getItalicButtonElByType = type =>
    `option-chart-${type}-text-style-italic-toggle`

export const changeTextAlignOption = (type, optionName) => {
    cy.getBySel(getTextAlignSelectElByType(type)).click()
    cy.getBySelLike(getTextAlignOptionElByType(type))
        .contains(optionName)
        .click()
}

export const changeFontSizeOption = (type, optionName) => {
    cy.getBySel(getFontSizeSelectElByType(type)).click()
    cy.getBySelLike(getFontSizeOptionElByType(type))
        .contains(optionName)
        .click()
}

export const clickBoldButton = type =>
    cy.getBySel(getBoldButtonElByType(type)).click()

export const clickItalicButton = type =>
    cy.getBySel(getItalicButtonElByType(type)).click()

// FIXME: Find a way to test the color picker
// export const changeTitleColorOption = color => {
//     cy.getBySel('option-chart-title-text-style-text-color-picker')
//         .invoke('val', color)
//         .trigger('change')
//         .blur()
// }
