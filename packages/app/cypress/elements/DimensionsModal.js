const dimensionsModalEl = 'dialog-manager'
const dimensionsModalUpdateButtonEl = 'dialog-manager-modal-action-confirm'
const unselectedListEl = 'data-dimension-item-selector-unselected-items-list'
const unselectedItemEl =
    'data-dimension-item-selector-unselected-items-list-item'

export const expectDimensionsModalToBeVisible = () =>
    cy.getBySel(dimensionsModalEl).should('be.visible')

export const expectDimensionsModalToNotBeVisible = () =>
    cy.getBySel(dimensionsModalEl).should('not.be.visible')

export const selectRandomIndicators = amount => {
    expectDimensionsModalToBeVisible()
    for (let i = 0; i < amount; i++) {
        cy.getBySel(unselectedItemEl)
            .its('length')
            .then(size => {
                cy.getBySel(unselectedListEl)
                    .children()
                    .eq(Math.floor(Math.random() * size))
                    .dblclick()
            })
    }
}

export const selectIndicator = indicator => {
    expectDimensionsModalToBeVisible()
    cy.getBySel(unselectedListEl)
        .contains(indicator)
        .dblclick()
}

export const clickUpdate = () => {
    expectDimensionsModalToBeVisible()
    cy.getBySel(dimensionsModalUpdateButtonEl).click()
    expectDimensionsModalToNotBeVisible()
}
