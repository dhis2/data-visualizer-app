import { expectDimensionModalToBeVisible } from './DimensionModal'

const dimButtonEl = 'dimensions-panel-list-dimension-item-button'
const dimContextMenuButtonEl = 'dimensions-panel-list-dimension-item-menu'
const dimContextMenuRemoveOptionEl =
    'dimensions-panel-dimension-menu-item-remove'
const dimContextMenuActionOptionEl =
    'dimensions-panel-dimension-menu-item-action'
const filterInputEl = 'dimensions-panel-filter'
const fixedDimsWrapperEl = 'dimensions-panel-list-fixed-dimensions'
const dimSelectedBackgroundColor = 'rgb(224, 242, 241)'

export const openContextMenu = dimensionId =>
    cy.getBySel(`${dimContextMenuButtonEl}-${dimensionId}`).click()

export const openDimension = dimensionId => {
    cy.getBySel(`${dimButtonEl}-${dimensionId}`).click()
    expectDimensionModalToBeVisible(dimensionId)
}

export const clickContextMenuAdd = (dimensionId, axisId) =>
    cy
        .getBySel(`${dimContextMenuActionOptionEl}-${dimensionId}-to-${axisId}`)
        .should('contain', 'Add to')
        .click()

export const clickContextMenuMove = (dimensionId, axisId) =>
    cy
        .getBySel(`${dimContextMenuActionOptionEl}-${dimensionId}-to-${axisId}`)
        .should('contain', 'Move to')
        .click()

export const clickContextMenuRemove = dimensionId =>
    cy
        .getBySel(`${dimContextMenuRemoveOptionEl}-${dimensionId}`)
        .should('contain', 'Remove')
        .click()

export const filterDimensionsByText = searchInput =>
    cy
        .getBySel(filterInputEl)
        .find('input')
        .type(searchInput)

export const clearDimensionsFilter = () =>
    cy
        .getBySel(filterInputEl)
        .find('input')
        .clear()

export const expectFixedDimensionsToHaveLength = length =>
    cy
        .getBySel(fixedDimsWrapperEl)
        .children()
        .should('have.length', length)

export const expectDimensionToHaveSelectedStyle = dimensionId =>
    cy
        .getBySel(`${dimButtonEl}-${dimensionId}`)
        .parent()
        .should('have.css', 'background-color', dimSelectedBackgroundColor)
// FIXME: -FRAGILE- set in Analytics but will break if @dhis2/ui changes their theme colors

export const expectDimensionToNotHaveSelectedStyle = dimensionId =>
    cy
        .getBySel(`${dimButtonEl}-${dimensionId}`)
        .parent()
        .should('not.have.css', 'background-color', dimSelectedBackgroundColor)
