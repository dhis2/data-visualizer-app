import { DIMENSION_ID_ORGUNIT } from '@dhis2/analytics'
import { expectDimensionModalToBeVisible } from '.'

const orgUnitModalEl = 'dialog-manager-ou'

export const expectOrgUnitDimensionModalToBeVisible = () =>
    expectDimensionModalToBeVisible(DIMENSION_ID_ORGUNIT)

export const clickOrgUnitTreeItem = itemName =>
    cy
        .getBySel(orgUnitModalEl)
        .find('*[role="button"]')
        .contains(itemName)
        .click()
