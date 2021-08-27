const drillDownOrgUnitEl = 'visualization-drill-down-menu-org-unit'
const drillDownOrgUnitDrillUpEl =
    'visualization-drill-down-menu-org-unit-drill-up'
const drillDownOrgUnitDrillDownEl =
    'visualization-drill-down-menu-org-unit-drill-down'

export const expectDrillDownMenuToBeVisible = () =>
    cy.getBySel(drillDownOrgUnitEl).should('be.visible')

export const expectDrillDownMenuToNotBeVisible = () =>
    cy.getBySel(drillDownOrgUnitEl).should('not.exist')

export const clickChangeOrgUnit = () =>
    cy.getBySel(drillDownOrgUnitEl).containsExact('Change org unit').click()

export const drillDown = option =>
    cy.getBySel(drillDownOrgUnitDrillDownEl).containsExact(option).click()

export const drillUp = option =>
    cy.getBySel(drillDownOrgUnitDrillUpEl).containsExact(option).click()
