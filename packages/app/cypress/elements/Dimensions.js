export const selectDimension = dimension => {
    // TODO: Select by name instead of by id
    cy.get(`[data-test=dimension-id-${dimension}]`).click()
}

export const selectIndicator = indicator => {
    // TODO: Select by name instead of by id
    cy.get(`[data-test=dimension-item-${indicator}]`).dblclick()
}

export const clickUpdate = () => {
    cy.get(`[data-test=dhis2-uicore-buttonstrip]`)
        .find(`[data-test=dhis2-uicore-button]`)
        .eq(1)
        .click()
}
