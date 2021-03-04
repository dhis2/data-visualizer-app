const getTextAlignSelectEl = prefix => `${prefix}-text-style-text-align-select`
const getTextAlignOptionEl = prefix => `${prefix}-text-style-text-align-option`
const getFontSizeSelectEl = prefix => `${prefix}-text-style-font-size-select`
const getFontSizeOptionEl = prefix => `${prefix}-text-style-font-size-option`
const getBoldButtonEl = prefix => `${prefix}-text-style-bold-toggle`
const getItalicButtonEl = prefix => `${prefix}-text-style-italic-toggle`

export const changeTextAlignOption = (prefix, optionName) => {
    cy.getBySel(getTextAlignSelectEl(prefix)).click()
    cy.getBySelLike(getTextAlignOptionEl(prefix)).contains(optionName).click()
}

export const changeFontSizeOption = (prefix, optionName) => {
    cy.getBySel(getFontSizeSelectEl(prefix)).click()
    cy.getBySelLike(getFontSizeOptionEl(prefix))
        .contains(new RegExp(`(?<!.)${optionName}(?!.)`, 'gm'))
        .click()
}

export const clickBoldButton = prefix =>
    cy.getBySel(getBoldButtonEl(prefix)).click()

export const clickItalicButton = prefix =>
    cy.getBySel(getItalicButtonEl(prefix)).click()

/*FIXME: Find a way to test the color picker
    export const changeTitleColorOption = color => 
        cy.getBySel('option-chart-title-text-style-text-color-picker')
            .invoke('val', color)
            .trigger('change')
            .blur()
*/
