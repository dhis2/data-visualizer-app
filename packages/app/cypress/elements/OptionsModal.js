const tabBarEl = 'options-modal-tab-bar'

export const OPTIONS_TAB_STYLE = 'Style'

export const clickOptionsTab = name =>
    cy
        .getBySel(tabBarEl)
        .contains(name)
        .click()

export const changeTitleFontSizeOption = option => {
    cy.getBySel('option-chart-title-text-style-font-size-select').click()
    console.log(option)
}
