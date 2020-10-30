import { expectDimensionsModalToBeVisible } from './DimensionsModal'

const dimensionButton = 'dimensions-panel-list-dimension-item-button'

export const openDimension = dimensionId => {
    cy.getBySel(`${dimensionButton}-${dimensionId}`).click()
    expectDimensionsModalToBeVisible()
}
