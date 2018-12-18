class Dimensions {
    selectDimension(dimension) {
        cy.get(`[data-test=${dimension}]`).click();
    }

    selectIndicator(indicator) {
        cy.get(`[data-test=${indicator}]`).dblclick();
    }

    clickUpdate() {
        cy.get(`[data-test=dialog-manager]`)
            .find(`[data-test=update-button]`)
            .click();
    }
}

export default Dimensions;
