export const selectIndicator = indicator => {
    cy.contains(indicator).dblclick()
}

export const clickUpdate = () => {
    cy.get(`[data-test=dhis2-uicore-buttonstrip]`) // TODO: Add a data-test to the modal to target this better
        .find(`[data-test=dhis2-uicore-button]`)
        .eq(1)
        .click()
}
