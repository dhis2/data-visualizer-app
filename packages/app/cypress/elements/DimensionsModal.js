const dimensionsModalEl = '[data-test="dhis2-uicore-modal"]' // TODO: Add data-test specific to this modal
const unselectedEl = '.unselected-list'

export const selectIndicator = indicator => {
    cy.get(dimensionsModalEl)
        .find(unselectedEl)
        .contains(indicator)
        .dblclick()
}

export const clickUpdate = () => {
    cy.get(`[data-test=dhis2-uicore-buttonstrip]`) // TODO: Add a data-test to the modal to target this better
        .find(`[data-test=dhis2-uicore-button]`)
        .eq(1)
        .click()
}
