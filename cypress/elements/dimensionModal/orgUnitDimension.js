import { DIMENSION_ID_ORGUNIT } from '@dhis2/analytics'

import { expectDimensionModalToBeVisible } from '.'

const orgUnitModalEl = 'dialog-manager-ou'
const levelSelectorEl = '*[class^="MuiModal"]'

export const expectOrgUnitDimensionModalToBeVisible = () =>
    expectDimensionModalToBeVisible(DIMENSION_ID_ORGUNIT)

export const clickOrgUnitTreeItem = itemName =>
    cy
        .getBySel(orgUnitModalEl)
        .find('*[role="button"]')
        .contains(itemName)
        .click()

export const selectOrgUnitLevel = name => {
    cy.getBySel(orgUnitModalEl).contains('Select a level').click()
    cy.get(levelSelectorEl).contains(name).click()
    cy.get(levelSelectorEl).type('{esc}')
}
