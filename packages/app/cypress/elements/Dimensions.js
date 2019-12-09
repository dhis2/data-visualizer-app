class Dimensions {
    selectDimension(dimension) {
        cy.get(`[data-test=dimension-id-${dimension}]`).click()
    }

    selectIndicator(indicator) {
        cy.get(`[data-test=dimension-item-${indicator}]`).dblclick()
    }

    clickUpdate() {
        cy.get(`[data-test=dialog-manager]`)
            .find(`[data-test=update-button]`)
            .click()
    }
}

export default Dimensions
