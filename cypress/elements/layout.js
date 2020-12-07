const yoyCategorySelectEl = 'yoy-layout-rows-select'
const youCategorySelectOptionEl = 'yoy-layout-rows-select-option'
const chipEl = 'layout-chip'
const chipMenuButtonEl = 'layout-chip-menu-button'
const chipMenuRemoveOptionEl = 'layout-chip-menu-dimension-menu-item-remove'
const chipMenuActionOptionEl = 'layout-chip-menu-dimension-menu-item-action'
const chipMenuSubMenuOptionEl =
    'layout-chip-menu-dimension-menu-item-DIMENSIONID-menu'
const chipSelectedBackgroundColor = 'rgb(178, 223, 219)'

const getAxisEl = axisId => `${axisId}-axis`
const getDimensionChipEl = dimensionId => `${chipEl}-${dimensionId}`

export const selectYoyCategoryOption = option => {
    cy.getBySel(yoyCategorySelectEl).click()
    cy.getBySelLike(youCategorySelectOptionEl)
        .contains(option)
        .click()
}

export const expectAxisToHaveDimension = (axisId, dimensionId) => {
    if (axisId && dimensionId) {
        cy.getBySel(getAxisEl(axisId))
            .findBySel(getDimensionChipEl(dimensionId))
            .should('have.length', 1)
            .and('be.visible')
    } else {
        throw new Error('axisId and dimensionId not provided')
    }
}

export const expectAxisToNotHaveDimension = (axisId, dimensionId) => {
    if (axisId && dimensionId) {
        cy.getBySel(getAxisEl(axisId))
            .findBySel(getDimensionChipEl(dimensionId))
            .should('not.exist')
    } else {
        throw new Error('axisId and dimensionId not provided')
    }
}

export const expectLayoutToHaveDimension = dimensionId =>
    cy
        .getBySel(getDimensionChipEl(dimensionId))
        .should('have.length', 1)
        .and('be.visible')

export const expectLayoutToNotHaveDimension = dimensionId =>
    cy.getBySel(getDimensionChipEl(dimensionId)).should('not.exist')

export const expectDimensionToHaveItemAmount = (
    dimensionId,
    itemAmount = 0
) => {
    if (dimensionId) {
        itemAmount
            ? cy
                  .getBySel(getDimensionChipEl(dimensionId))
                  .contains(`${itemAmount} selected`)
                  .should('have.length', 1)
                  .and('be.visible')
            : cy
                  .getBySel(getDimensionChipEl(dimensionId))
                  .contains(`selected`)
                  .should('have.length', 0)
    } else {
        throw new Error('dimensionId not provided')
    }
}

export const expectDimensionToBeLockedToAxis = (dimensionId, axisId) =>
    cy
        .getBySel(getAxisEl(axisId))
        .findBySel(`${getDimensionChipEl(dimensionId)}-lock-icon`)
        .should('have.length', 1)
        .and('be.visible')

export const expectDimensionToNotHaveItems = dimensionId =>
    expectDimensionToHaveItemAmount(dimensionId)

export const openDimension = dimensionId =>
    cy.getBySel(getDimensionChipEl(dimensionId)).click()

export const openContextMenu = dimensionId =>
    cy.getBySel(`${chipMenuButtonEl}-${dimensionId}`).click()

export const clickContextMenuAdd = (dimensionId, axisId) =>
    cy
        .getBySel(`${chipMenuActionOptionEl}-${dimensionId}-to-${axisId}`)
        .contains('Add to')
        .click()

export const clickContextMenuMove = (dimensionId, axisId) =>
    cy
        .getBySel(`${chipMenuActionOptionEl}-${dimensionId}-to-${axisId}`)
        .contains('Move to')
        .click()

export const clickContextMenuRemove = dimensionId =>
    cy
        .getBySel(`${chipMenuRemoveOptionEl}-${dimensionId}`)
        .contains('Remove')
        .click()

export const expectDimensionToHaveSelectedStyle = dimensionId =>
    cy
        .getBySel(getDimensionChipEl(dimensionId))
        .parent()
        .should('have.css', 'background-color', chipSelectedBackgroundColor)
// FIXME: -FRAGILE- set in Analytics but will break if @dhis2/ui changes their theme colors

export const expectDimensionToNotHaveSelectedStyle = dimensionId =>
    cy
        .getBySel(getDimensionChipEl(dimensionId))
        .parent()
        .should('not.have.css', 'background-color', chipSelectedBackgroundColor)

export const clickContextMenuDimSubMenu = dimensionId =>
    cy
        .getBySel(chipMenuSubMenuOptionEl.replace('DIMENSIONID', dimensionId))
        .contains('Add')
        .click()

export const clickContextMenuSwap = (fromId, toId) =>
    cy
        .getBySel(`${chipMenuActionOptionEl}-${fromId}-to-${toId}`)
        .contains('Swap')
        .click()
