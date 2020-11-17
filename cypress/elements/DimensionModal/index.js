const dimensionModalEl = 'dialog-manager'
const dimensionModalUpdateButtonEl = 'dialog-manager-modal-action-confirm'
const dimensionModalHideButtonEl = 'dialog-manager-modal-action-cancel'
//const dimensionModalTitleEl = 'dialog-manager-modal-title'

export const expectDimensionModalToBeVisible = dimensionId =>
    cy.getBySel(`${dimensionModalEl}-${dimensionId}`).should('be.visible')

export const expectDimensionModalToNotBeVisible = () =>
    cy.getBySelLike(dimensionModalEl).should('not.be.visible')

export const clickDimensionModalUpdateButton = () =>
    cy.getBySel(dimensionModalUpdateButtonEl).click()

export const clickDimensionModalHideButton = () =>
    cy.getBySel(dimensionModalHideButtonEl).click()

export { selectDataElements, removeAllDataItems } from './dataDimension'

export { selectRelativePeriods, selectFixedPeriods } from './periodDimension'

export {
    expectOrgUnitDimensionModalToBeVisible,
    removeAllOrgUnitItems,
    clickOrgUnitTreeItem,
} from './orgUnitDimension'
