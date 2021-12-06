import { DIMENSION_ID_PERIOD } from '@dhis2/analytics'
import { expectDimensionModalToBeVisible } from '.'

const relativePeriodsButtonEl = 'period-dimension-relative-periods-button'
const fixedPeriodsButtonEl = 'period-dimension-fixed-periods-button'
const relativePeriodsPeriodTypeButtonEl =
    'period-dimension-relative-period-filter-content'
const fixedPeriodsPeriodTypeButtonEl =
    'period-dimension-fixed-period-filter-period-type-content'
const periodTypeMenuEl = 'dhis2-uicore-select-menu-menuwrapper'
//const fixedPeriodsYearEl = 'period-dimension-fixed-period-filter-year-content'
const selectableItemsEl = 'period-dimension-transfer-sourceoptions'
const selectedItemsEl = 'period-dimension-transfer-pickedoptions'
const relativePeriodTypeSelectOptionEl =
    'period-dimension-relative-period-filter-option'

const fixedPeriodTypeSelectOptionEl =
    'period-dimension-fixed-period-filter-period-type-option'

export const expectPeriodDimensionModalToBeVisible = () =>
    expectDimensionModalToBeVisible(DIMENSION_ID_PERIOD)

export const selectRelativePeriods = (periods, periodType) => {
    switchToRelativePeriods()
    if (periodType !== 'Months') {
        // Temp fix for https://jira.dhis2.org/browse/TECH-396, as Months is the default option and can't be clicked
        openRelativePeriodsTypeSelect()
        selectPeriodType(periodType)
    }
    periods.forEach((item) => clickSourceOption(item))
}

export const selectFixedPeriods = (periods, periodType) => {
    switchToFixedPeriods()
    if (periodType !== 'Monthly') {
        // Temp fix for https://jira.dhis2.org/browse/TECH-396, as Monthly is the default option and can't be clicked
        openFixedPeriodsTypeSelect()
        selectPeriodType(periodType)
    }
    periods.forEach((item) => clickSourceOption(item))
}

const clickSourceOption = (itemName) =>
    cy.getBySel(selectableItemsEl).contains(itemName).dblclick()

export const selectPeriodType = (periodTypeOption) =>
    cy.getBySel(periodTypeMenuEl).containsExact(periodTypeOption).click()

export const expectRelativePeriodTypeToBe = (type) =>
    cy.getBySelLike(relativePeriodsPeriodTypeButtonEl).should('contain', type)

export const expectFixedPeriodTypeToBe = (type) =>
    cy.getBySelLike(fixedPeriodsPeriodTypeButtonEl).should('contain', type)

export const switchToFixedPeriods = () => {
    cy.getBySel(fixedPeriodsButtonEl).click()
    expectFixedToBeSelected()
}

export const switchToRelativePeriods = () => {
    cy.getBySel(relativePeriodsButtonEl).click()
    expectRelativeToBeSelected()
}

export const expectRelativeToBeSelected = () =>
    cy.getBySel(relativePeriodsButtonEl).should('have.class', 'selected')

export const expectFixedToBeSelected = () =>
    cy.getBySel(fixedPeriodsButtonEl).should('have.class', 'selected')

export const expectNoPeriodsToBeSelected = () =>
    cy.getBySel(selectedItemsEl).should('contain', 'No periods selected')

export const expectRelativePeriodTypeSelectToContain = (periodType) => {
    cy.getBySelLike(relativePeriodTypeSelectOptionEl).should(
        'contain',
        periodType
    )
}

export const expectRelativePeriodTypeSelectToNotContain = (periodType) => {
    cy.getBySelLike(relativePeriodTypeSelectOptionEl).should(
        'not.contain',
        periodType
    )
}

export const expectFixedPeriodTypeSelectToContain = (periodType) => {
    cy.getBySelLike(fixedPeriodTypeSelectOptionEl).should('contain', periodType)
}

export const expectFixedPeriodTypeSelectToNotContain = (periodType) => {
    cy.getBySelLike(fixedPeriodTypeSelectOptionEl).should(
        'not.contain',
        periodType
    )
}

export const openRelativePeriodsTypeSelect = () =>
    cy.getBySel(relativePeriodsPeriodTypeButtonEl).click()

export const openFixedPeriodsTypeSelect = () =>
    cy.getBySel(fixedPeriodsPeriodTypeButtonEl).click()
