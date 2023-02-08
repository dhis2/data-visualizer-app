const modalTitleEl = 'calculation-modal-title'

export const clickNewCalculationButton = () =>
    cy
        .getBySel('data-dimension-transfer-leftfooter')
        .containsExact('Calculation')
        .click()

export const expectCalculationsModalToBeVisible = () =>
    cy.getBySel('calculation-modal').should('be.visible')

export const expectCalculationsModalTitleToContain = (text) =>
    cy.getBySel(modalTitleEl).should('contain', text)
