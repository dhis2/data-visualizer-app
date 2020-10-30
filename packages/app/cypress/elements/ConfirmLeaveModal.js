const confirmLeaveModalEl = '[data-test="confirm-leave-modal"]'
const optionCancel = '[data-test="option-cancel"]'
const optionConfirm = '[data-test="option-confirm"]'

export const confirmLeave = shouldLeave => {
    cy.get(confirmLeaveModalEl)
        .find(shouldLeave ? optionConfirm : optionCancel)
        .click()
}
