class Dimensions {
    selectDimension(dimension) {
        cy.get(`[data-test=dimension-id-${dimension}]`).click()
    }

    selectItem(itemId) {
        cy.get(`[data-test=dimension-item-${itemId}]`).dblclick()
    }

    selectFirstItem() {
        cy.get('.unselected-list li:first-child .unselected-item').dblclick()
    }

    clickUpdate() {
        cy.get(`[data-test=dialog-manager]`)
            .contains('Update')
            .click()
    }
}

export default Dimensions
