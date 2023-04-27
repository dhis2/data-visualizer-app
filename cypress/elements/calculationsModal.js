import { typeInput } from './common.js'

const calculationModalEl = 'calculation-modal'
const modalTitleEl = 'calculation-modal-title'
const formulaFieldEl = 'formula-field'
const dimensionsListEl = 'dimension-list'

const saveButton = () =>
    cy.getBySel(calculationModalEl).find('button').contains('Save calculation')

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
    cy.getBySelLike(dimensionsListEl)
        .findBySelLike('data-element-option')
        .should('have.length', length)
}

export const expectFormulaFieldToContainItem = (item) =>
    cy.getBySel(formulaFieldEl).contains(item).should('exist')

export const expectFormulaFieldToNotContainItem = (item) =>
    cy.getBySel(formulaFieldEl).contains(item).should('not.exist')

export const selectItemFromDimensionsListByDoubleClick = (item) => {
    cy.getBySelLike(dimensionsListEl)
        .findBySelLike('data-element-option')
        .should('have.length.least', 1)
        .contains(item)
        .dblclick()
}

export const selectOperatorFromListByDoubleClick = (item) => {
    cy.getBySelLike('operators-list').contains(item).dblclick()
}

export const removeItemFromFormulaFieldByDoubleClick = (item) =>
    cy
        .getBySel('formula-field')
        .findBySelLike('formula-item')
        .contains(item)
        .dblclick()

export const inputCalculationLabel = (label) =>
    typeInput('calculation-label', label)

export const clickSaveButton = () => saveButton().click()

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

export const clickCheckFormulaButton = () =>
    cy
        .getBySel(calculationModalEl)
        .find('button')
        .contains('Check formula')
        .click()

export const expectSaveButtonToBeEnabled = () => {
    saveButton().should('not.have.attr', 'disabled')
    saveButton().parent().should('not.have.css', 'cursor', 'not-allowed')
}

export const expectSaveButtonToBeDisabled = () => {
    saveButton().should('have.attr', 'disabled')
    saveButton().parent().should('have.css', 'cursor', 'not-allowed')
}

export const expectSaveButtonToHaveTooltip = (tooltip) => {
    saveButton().trigger('mouseover', { force: true }) // use force as the button is disabled
    cy.getBySelLike('tooltip-content').contains(tooltip)
    saveButton().trigger('mouseout', { force: true })
}

export const expectSaveButtonToNotHaveTooltip = () => {
    saveButton().trigger('mouseover')
    cy.getBySelLike('tooltip-content').should('not.exist')
    saveButton().trigger('mouseout')
}

export const typeInNumberField = (id, value) =>
    cy
        .getBySel(formulaFieldEl)
        .findBySel(`formula-item-EXPRESSION_TYPE_NUMBER-${id}`)
        .find('input')
        .type(value)

export const expectFormulaToNotBeValidated = () => {
    cy.getBySel('validation-message').should('be.empty')
}

export const expectFormulaToBeValid = () => {
    cy.getBySel('validation-message').containsExact('Valid')
}

export const expectFormulaToBeInvalid = (message) => {
    cy.getBySel('validation-message').containsExact(message)
}
