import { expectDimensionModalToBeVisible } from './DimensionModal'

const dimButtonEl = 'dimensions-panel-list-dimension-item-button'
const dimContextMenuButtonEl = 'dimensions-panel-list-dimension-item-menu'
const dimContextMenuRemoveOptionEl =
    'dimensions-panel-dimension-menu-item-remove'
const dimContextMenuActionOptionEl =
    'dimensions-panel-dimension-menu-item-action'

export const openContextMenu = dimensionId =>
    cy.getBySel(`${dimContextMenuButtonEl}-${dimensionId}`).click()

export const openDimension = dimensionId => {
    cy.getBySel(`${dimButtonEl}-${dimensionId}`).click()
    expectDimensionModalToBeVisible(dimensionId)
}

export const clickContextMenuAdd = (dimensionId, axisId) => {
    cy.getBySel(`${dimContextMenuActionOptionEl}-${dimensionId}-to-${axisId}`)
        .should('contain', 'Add to')
        .click()
}

export const clickContextMenuMove = (dimensionId, axisId) => {
    cy.getBySel(`${dimContextMenuActionOptionEl}-${dimensionId}-to-${axisId}`)
        .should('contain', 'Move to')
        .click()
}

export const clickContextMenuRemove = dimensionId => {
    cy.getBySel(`${dimContextMenuRemoveOptionEl}-${dimensionId}`)
        .should('contain', 'Remove')
        .click()
}
