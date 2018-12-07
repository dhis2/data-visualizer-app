class DimensionPanel {
    selectDimension(dimension) {
        cy.get(`[data-test=${dimension}]`).click();
    }
}

export default DimensionPanel;
