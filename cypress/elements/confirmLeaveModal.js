const confirmLeaveModalEl = 'confirm-leave-modal'
const optionCancel = 'confirm-leave-modal-option-cancel'
const optionConfirm = 'confirm-leave-modal-option-confirm'

export const confirmLeave = shouldLeave =>
    cy.getBySel(shouldLeave ? optionConfirm : optionCancel).click()

export const expectConfirmLeaveModalToBeVisible = () =>
    cy
        .getBySel(confirmLeaveModalEl)
        .should('have.length', 1)
        .and('be.visible')
