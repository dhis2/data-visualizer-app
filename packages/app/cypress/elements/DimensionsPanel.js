import { expectDimensionModalToBeVisible } from './DimensionModal'

const dimensionButton = 'dimensions-panel-list-dimension-item-button'

export const openDimension = dimensionId => {
    cy.getBySel(`${dimensionButton}-${dimensionId}`).click()
    expectDimensionModalToBeVisible(dimensionId)
}
