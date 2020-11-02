const dimensionsModalEl = 'dialog-manager'
const dimensionsModalUpdateButtonEl = 'dialog-manager-modal-action-confirm'

export const expectDimensionsModalToBeVisible = () =>
    cy.getBySel(dimensionsModalEl).should('be.visible')

export const expectDimensionsModalToNotBeVisible = () =>
    cy.getBySel(dimensionsModalEl).should('not.be.visible')

export const clickUpdate = () => {
    expectDimensionsModalToBeVisible()
    cy.getBySel(dimensionsModalUpdateButtonEl).click()
    expectDimensionsModalToNotBeVisible()
}

export {
    selectRandomIndicators,
    selectDataElements,
    selectIndicators,
} from './dataDimension'
