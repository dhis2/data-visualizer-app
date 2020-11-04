const chipEl = 'layout-chip'
// const chipMenuEl = 'layout-chip-menu-button'
const yoyCategorySelectEl = 'yoy-layout-rows-select'
const youCategorySelectOptionEl = 'yoy-layout-rows-select-option'

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
            .should('be.visible')
    } else {
        throw new Error('axisId and dimensionId not provided')
    }
}

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
                  .should('be.visible')
            : cy
                  .getBySel(getDimensionChipEl(dimensionId))
                  .contains(`selected`)
                  .should('have.length', 0)
    } else {
        throw new Error('dimensionId not provided')
    }
}

export const expectDimensionToNotHaveItems = dimensionId =>
    expectDimensionToHaveItemAmount(dimensionId)
