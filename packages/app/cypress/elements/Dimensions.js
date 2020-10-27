class Dimensions {
    selectDimension(dimension) {
        cy.get(`[data-test=dimension-id-${dimension}]`).click() // TODO: Select by name instead of by id
    }

    selectIndicator(indicator) {
        cy.get(`[data-test=dimension-item-${indicator}]`).dblclick() // TODO: Select by name instead of by id
    }

    clickUpdate() {
        cy.get(`[data-test=dhis2-uicore-buttonstrip]`)
            .find(`[data-test=dhis2-uicore-button]`)
            .eq(1)
            .click()
    }
}

export default Dimensions
