const valueCellEl = 'visualization-value-cell'

export const clickTableValueCell = (index) =>
    cy.getBySel(valueCellEl).eq(index).click()

export const expectTableValueCellsToHaveLength = (length) =>
    cy.getBySel(valueCellEl).should('have.length', length)

export const expectTableValueCellToContainValue = (index, value) =>
    cy.getBySel(valueCellEl).eq(index).contains(value)
