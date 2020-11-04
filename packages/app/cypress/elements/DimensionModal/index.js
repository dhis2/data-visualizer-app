import { DIMENSION_ID_DATA, DIMENSION_ID_PERIOD } from '@dhis2/analytics'

const dimensionModalEl = 'dialog-manager'
const dimensionModalUpdateButtonEl = 'dialog-manager-modal-action-confirm'
const dimensionModalTitleEl = 'dialog-manager-modal-title'

export const expectDimensionModalToBeVisible = dimensionId => {
    cy.getBySel(dimensionModalEl).should('be.visible')
    switch (dimensionId) {
        case DIMENSION_ID_DATA:
            cy.getBySel(dimensionModalTitleEl)
                .contains('Data')
                .should('exist')
            break
        case DIMENSION_ID_PERIOD:
            cy.getBySel(dimensionModalTitleEl)
                .contains('Period')
                .should('exist')
            break
    }
}

export const expectDimensionModalToNotBeVisible = () =>
    cy.getBySel(dimensionModalEl).should('not.be.visible')

export const clickModalUpdateButton = () => {
    expectDimensionModalToBeVisible()
    cy.getBySel(dimensionModalUpdateButtonEl).click()
    expectDimensionModalToNotBeVisible()
}

export { selectDataElements, removeAllDataItems } from './dataDimension'

export { selectRelativePeriods, selectFixedPeriods } from './periodDimension'
