import { typeInput } from './common.js'

const calculationModalEl = 'calculation-modal'
const modalTitleEl = 'calculation-modal-title'

export const clickNewCalculationButton = () =>
    cy
        .getBySel('data-dimension-transfer-leftfooter')
        .containsExact('Calculation')
        .click()

export const expectCalculationsModalToBeVisible = () =>
    cy.getBySel(calculationModalEl).should('be.visible')

export const expectCalculationsModalTitleToContain = (text) =>
    cy.getBySel(modalTitleEl).should('contain', text)

export const expectDimensionsListToHaveLength = (length) => {
    cy.getBySelLike('dimension-list')
        .findBySelLike('data-element-option')
        .should('have.length', length)
}

export const expectFormulaFieldToContainItem = (item) =>
    cy
        .getBySel('formula-field')
        .findBySelLike('formula-item-EXPRESSION_TYPE_DATA')
        .contains(item)
        .should('exist')

export const selectItemFromDimensionsListByDoubleClick = (item) => {
    cy.getBySelLike('dimension-list')
        .findBySelLike('data-element-option')
        .should('have.length.least', 1)
        .contains(item)
        .dblclick()
}

export const inputCalculationLabel = (label) =>
    typeInput('calculation-label', label)

export const clickSaveButton = () =>
    cy
        .getBySel(calculationModalEl)
        .find('button')
        .contains('Save calculation')
        .click()

export const clickCancelButton = () =>
    cy.getBySel(calculationModalEl).find('button').contains('Cancel').click()

export const clickDeleteButton = () =>
    cy
        .getBySel(calculationModalEl)
        .find('button')
        .contains('Delete calculation')
        .click()

export const clickConfirmDeleteButton = () =>
    cy
        .getBySel('calculation-delete-modal')
        .find('button')
        .contains('Yes, delete')
        .click()