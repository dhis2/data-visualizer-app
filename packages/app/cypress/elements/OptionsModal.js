const tabBarEl = 'options-modal-tab-bar'
const optionsModalEl = 'options-modal'
const optionsModalUpdateButtonEl = 'options-modal-action-confirm'
const optionsModalHideButtonEl = 'options-modal-action-cancel'

export const OPTIONS_TAB_STYLE = 'Style'

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
export const clickOptionssModalHideButton = () => {
    cy.getBySel(optionsModalHideButtonEl).click()
    expectOptionsModalToNotBeVisible()
}

export const changeTitleFontSizeOption = optionName => {
    cy.getBySel('option-chart-title-text-style-font-size-select').click()
    cy.getBySelLike('option-chart-title-text-style-font-size-option')
        .contains(optionName)
        .click()
}
