const tabBarEl = 'options-modal-tab-bar'
const tabBarOffset = { offset: { top: 20, left: 0 } }

export const OPTIONS_TAB_STYLE = 'Style'

export const clickOptionsTab = name =>
    cy
        .getBySel(tabBarEl)
        .contains(name)
        .click()

export const changeTitleFontSizeOption = option => {
    cy.getBySel('option-chart-title-text-style-font-size-select')
        .scrollIntoView(tabBarOffset)
        .click()
    console.log(option)
    // FIXME: Doesn't scroll the select in to view, it's still hidden by the tab bar
}
