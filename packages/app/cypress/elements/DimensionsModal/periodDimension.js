import { expectDimensionsModalToBeVisible } from '.'

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
const fixedPeriodsYearEl = 'period-dimension-fixed-period-filter-year-content'

export const selectRelativePeriods = (periods, periodType) => {
    expectDimensionsModalToBeVisible()
    cy.getBySel(relativePeriodsButtonEl).click()
    if (periodType !== 'Months') {
        // Because of https://jira.dhis2.org/browse/TECH-396
        switchToPeriodType(relativePeriodsPeriodTypeButtonEl, periodType)
    }
    periods.forEach(item => clickSourceOption(item))
}

export const selectFixedPeriods = (periods, periodType) => {
    expectDimensionsModalToBeVisible()
    cy.getBySel(fixedPeriodsButtonEl).click()
    if (periodType !== 'Monthly') {
        // Because of https://jira.dhis2.org/browse/TECH-396
        switchToPeriodType(fixedPeriodsPeriodTypeButtonEl, periodType)
    }
    periods.forEach(item => clickSourceOption(item))
}

const clickSourceOption = itemName =>
    cy
        .getBySel(sourceOptionsListEl)
        .contains(itemName)
        .dblclick()

const switchToPeriodType = (periodTypeEl, periodTypeOption) => {
    cy.getBySel(periodTypeEl).click()
    cy.getBySel(periodTypeMenuEl)
        .contains(periodTypeOption)
        .click()
}
