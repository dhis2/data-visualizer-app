class DimensionPanel {
    selectDimension(dimension) {
        cy.get(`[data-test=${dimension}]`).click();
    }

    selectIndicator(indicator) {
        cy.get(`[data-test=${indicator}]`).dblclick();
    }
}

export default DimensionPanel;
