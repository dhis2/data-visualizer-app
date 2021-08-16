const selectionTypeManualEl = 'dynamic-dimension-selection-type-manual'
const selectionTypeAutomaticEl = 'dynamic-dimension-selection-type-automatic'
const modalContentEl = 'dialog-manager-modal-content'

export const expectManualSelectionToBeChecked = () =>
    cy
        .getBySel(selectionTypeManualEl)
        .find('[type="radio"]')
        .should('be.checked')

export const expectAutomaticSelectionToBeChecked = () =>
    cy
        .getBySel(selectionTypeAutomaticEl)
        .find('[type="radio"]')
        .should('be.checked')

export const changeSelectionToAutomatic = () =>
    cy
        .getBySelLike(modalContentEl)
        .contains('Automatically include all items')
        .click()

export const changeSelectionToManual = () =>
    cy.getBySelLike(modalContentEl).contains('Manually select items...').click()
