import { DIMENSION_ID_PERIOD } from '@dhis2/analytics'

import { expectDimensionModalToBeVisible } from '.'

const sourceOptionsListEl = 'dhis2-uicore-transfer-sourceoptions'
//const pickedOptionsListEl = 'dhis2-uicore-transfer-pickedoptions'
const relativePeriodsButtonEl = 'period-dimension-relative-periods-button'
const fixedPeriodsButtonEl = 'period-dimension-fixed-periods-button'
const relativePeriodsPeriodTypeButtonEl =
    'period-dimension-relative-period-filter-content'
// relative periods period type options = 'period-dimension-relative-period-filter-option-Days'
const fixedPeriodsPeriodTypeButtonEl =
    'period-dimension-fixed-period-filter-period-type-content'
// fixed periods period type options = 'period-dimension-fixed-period-filter-period-type-option-DAILY'
const periodTypeMenuEl = 'dhis2-uicore-select-menu-menuwrapper'
//const fixedPeriodsYearEl = 'period-dimension-fixed-period-filter-year-content'
const removeAllButtonEl = 'dhis2-uicore-transfer-actions-removeall'
//const addAllButtonEl = 'dhis2-uicore-transfer-actions-addall'

export const expectPeriodDimensionModalToBeVisible = () =>
    expectDimensionModalToBeVisible(DIMENSION_ID_PERIOD)

export const removeAllPeriodItems = () => cy.getBySel(removeAllButtonEl).click()

export const selectRelativePeriods = (periods, periodType) => {
    cy.getBySel(relativePeriodsButtonEl).click()
    if (periodType !== 'Months') {
        // Temp fix for https://jira.dhis2.org/browse/TECH-396, as Months is the default option and can't be clicked
        switchToPeriodType(relativePeriodsPeriodTypeButtonEl, periodType)
    }
    periods.forEach(item => clickSourceOption(item))
}

export const selectFixedPeriods = (periods, periodType) => {
    cy.getBySel(fixedPeriodsButtonEl).click()
    if (periodType !== 'Monthly') {
        // Temp fix for https://jira.dhis2.org/browse/TECH-396, as Monthly is the default option and can't be clicked
        switchToPeriodType(fixedPeriodsPeriodTypeButtonEl, periodType)
    }
    periods.forEach(item => clickSourceOption(item))
}

const clickSourceOption = itemName =>
    cy.getBySel(sourceOptionsListEl).contains(itemName).dblclick()

const switchToPeriodType = (periodTypeEl, periodTypeOption) => {
    cy.getBySel(periodTypeEl).click()
    cy.getBySel(periodTypeMenuEl).contains(periodTypeOption).click()
}
