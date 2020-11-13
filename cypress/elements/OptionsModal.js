const tabBarEl = 'options-modal-tab-bar'
const optionsModalEl = 'options-modal'
const optionsModalUpdateButtonEl = 'options-modal-action-confirm'
const optionsModalHideButtonEl = 'options-modal-action-cancel'

export const OPTIONS_TAB_STYLE = 'Style'
export const OPTIONS_TAB_DATA = 'Data'
export const TYPE_TITLE = 'title'
export const TYPE_SUBTITLE = 'subtitle'

export const clickOptionsTab = name =>
    cy
        .getBySel(tabBarEl)
        .contains(name)
        .click()

export const expectOptionsModalToBeVisible = () =>
    cy.getBySel(optionsModalEl).should('be.visible')

export const expectOptionsModalToNotBeVisible = () =>
    cy.getBySelLike(optionsModalEl).should('not.be.visible')

export const clickOptionsModalUpdateButton = () => {
    cy.getBySel(optionsModalUpdateButtonEl).click()
    expectOptionsModalToNotBeVisible()
}
export const clickOptionsModalHideButton = () => {
    cy.getBySel(optionsModalHideButtonEl).click()
    expectOptionsModalToNotBeVisible()
}

// font styles //

export const changeTextAlignOption = (type, optionName) => {
    cy.getBySel(`option-chart-${type}-text-style-text-align-select`).click()
    cy.getBySelLike(`option-chart-${type}-text-style-text-align-option`)
        .contains(optionName)
        .click()
}

export const changeFontSizeOption = (type, optionName) => {
    cy.getBySel(`option-chart-${type}-text-style-font-size-select`).click()
    cy.getBySelLike(`option-chart-${type}-text-style-font-size-option`)
        .contains(optionName)
        .click()
}

export const clickBoldButton = type =>
    cy.getBySel(`option-chart-${type}-text-style-bold-toggle`).click()

export const clickItalicButton = type =>
    cy.getBySel(`option-chart-${type}-text-style-italic-toggle`).click()

// FIXME: Find a way to test the color picker
// export const changeTitleColorOption = color => {
//     cy.getBySel('option-chart-title-text-style-text-color-picker')
//         .invoke('val', color)
//         .trigger('change')
//         .blur()
// }

// subtitle //

export const setCustomSubtitle = text => {
    cy.getBySel('option-chart-subtitle-type-radios')
        .contains('Custom')
        .click()
    cy.getBySel('option-chart-subtitle-text')
        .find('input')
        .type(text)
}

// lines //

export const enableTrendLine = () =>
    cy.getBySel('option-trend-line-checkbox').click()

export const selectTrendLineType = optionName => {
    cy.getBySel('option-trend-line-select')
        .findBySel('dhis2-uicore-select')
        .click()
    cy.getBySel('option-trend-line-option')
        .contains(optionName)
        .click()
}
