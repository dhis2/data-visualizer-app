import { DIMENSION_ID_PERIOD } from '@dhis2/analytics'

import { expectDimensionModalToContain } from '../../elements/dimensionModal'
import {
    expectPeriodDimensionModalToBeVisible,
    expectSelectedPeriodsAmountToBe,
    expectItemToBeSelected,
    expectRelativePeriodTypeToBe,
    expectRelativeToBeSelected,
    unselectItemByDoubleClick,
    selectItemByDoubleClick,
    unselectItemByButton,
    selectItemByButton,
    expectNoPeriodsToBeSelected,
    expectRelativePeriodTypeSelectToContain,
    expectFixedPeriodTypeSelectToContain,
    // expectRelativePeriodTypeSelectToNotContain,
    // expectFixedPeriodTypeSelectToNotContain,
    openRelativePeriodsTypeSelect,
    expectSelectablePeriodsAmountToBe,
    switchRelativePeriodType,
    selectPeriodType,
    unselectAllPeriods,
    switchToFixedPeriods,
    expectSelectablePeriodsAmountToBeLeast,
    openFixedPeriodsTypeSelect,
    switchFixedPeriodType,
} from '../../elements/dimensionModal/periodDimension' // TODO: Move to dimensionModal/index.js
import { openDimension } from '../../elements/dimensionsPanel'
import { goToStartPage } from '../../elements/startScreen'

const defaultRelativePeriod = 'Last 3 months'
const systemSettingsBody = {
    keyAnalysisRelativePeriod: 'LAST_3_MONTHS',
    keyAnalysisDigitGroupSeparator: 'COMMA',
    keyHideDailyPeriods: false,
    keyHideWeeklyPeriods: false,
    // TODO: Add Bi-weekly periods once it's supported
    keyHideMonthlyPeriods: false,
    keyHideBiMonthlyPeriods: false,
    keyIgnoreAnalyticsApprovalYearThreshold: -1,
    keyDateFormat: 'yyyy-MM-dd',
}

describe('Period dimension', () => {
    describe('initial state', () => {
        it('navigates to the start page', () => {
            cy.intercept(
                /systemSettings(\S)*keyAnalysisRelativePeriod(\S)*/,
                req => {
                    req.reply(res => {
                        res.send({ body: systemSettingsBody })
                    })
                }
            )
            // TODO: Intercept settings request with defaultRelativePeriod and hiddenPeriodTypes
            // TODO: Do this one more and hide months, to test that quarters are displayed as the preselected type instead
            goToStartPage()
        })
        it('opens the period dimension modal', () => {
            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
        })
        it('modal has a title', () => {
            expectDimensionModalToContain('Period')
        })
        it('1 period is selected', () => {
            expectSelectedPeriodsAmountToBe(1)
        })
        it(`period '${defaultRelativePeriod}' is selected`, () => {
            expectItemToBeSelected(defaultRelativePeriod)
        })
        it("period category is 'Relative'", () => {
            expectRelativeToBeSelected()
        })
        it("period type is 'Months'", () => {
            expectRelativePeriodTypeToBe('Months')
        })
        it('a period can be unselected by double click', () => {
            unselectItemByDoubleClick(defaultRelativePeriod)
            expectNoPeriodsToBeSelected()
        })
        it('a period can be selected by double click', () => {
            selectItemByDoubleClick(defaultRelativePeriod)
            expectItemToBeSelected(defaultRelativePeriod)
        })
        it('a period can be unselected by button', () => {
            unselectItemByButton(defaultRelativePeriod)
            expectNoPeriodsToBeSelected()
        })
        it('a period can be selected by button', () => {
            selectItemByButton(defaultRelativePeriod)
            expectItemToBeSelected(defaultRelativePeriod)
        })
        it('all can be unselected by button', () => {
            unselectAllPeriods()
        })
    })
    describe('relatives period', () => {
        const relativePeriodTypes = [
            { name: 'Days', amountOfChildren: 9 },
            { name: 'Weeks', amountOfChildren: 6 },
            { name: 'Bi-weeks', amountOfChildren: 3 },
            { name: 'Months', amountOfChildren: 6 },
            { name: 'Bi-months', amountOfChildren: 4 },
            { name: 'Quarters', amountOfChildren: 4 },
            { name: 'Six-months', amountOfChildren: 3 },
            { name: 'Financial Years', amountOfChildren: 3 },
            { name: 'Years', amountOfChildren: 3 },
        ]
        it('has the correct period types', () => {
            openRelativePeriodsTypeSelect()
            relativePeriodTypes.forEach(type =>
                expectRelativePeriodTypeSelectToContain(type.name)
            )
            selectPeriodType(relativePeriodTypes.slice(-1)[0].name) // Click the last item to close the dropdown
        })
        relativePeriodTypes.forEach(type =>
            it(`'${type.name}' has ${type.amountOfChildren} items`, () => {
                switchRelativePeriodType(type.name)
                expectSelectablePeriodsAmountToBe(type.amountOfChildren)
            })
        )
    })
    describe('fixed periods', () => {
        const fixedPeriodTypes = [
            { name: 'Daily', amountOfChildren: 365 },
            { name: 'Weekly', amountOfChildren: 52 },
            { name: 'Weekly (Start Wednesday)', amountOfChildren: 52 },
            { name: 'Weekly (Start Thursday)', amountOfChildren: 52 },
            { name: 'Weekly (Start Saturday)', amountOfChildren: 52 },
            { name: 'Weekly (Start Sunday)', amountOfChildren: 52 },
            { name: 'Bi-weekly', amountOfChildren: 26 },
            { name: 'Monthly', amountOfChildren: 12 },
            { name: 'Bi-monthly', amountOfChildren: 6 },
            { name: 'Quarterly', amountOfChildren: 4 },
            { name: 'Six-monthly', amountOfChildren: 2 },
            { name: 'Six-monthly April', amountOfChildren: 2 },
            { name: 'Yearly', amountOfChildren: 10 },
            { name: 'Financial year (Start November)', amountOfChildren: 10 },
            { name: 'Financial year (Start October)', amountOfChildren: 10 },
            { name: 'Financial year (Start July)', amountOfChildren: 10 },
            { name: 'Financial year (Start April)', amountOfChildren: 10 },
        ]
        it('can switch to fixed periods', () => {
            switchToFixedPeriods()
        })
        it('has the correct period types', () => {
            openFixedPeriodsTypeSelect()
            fixedPeriodTypes.forEach(type =>
                expectFixedPeriodTypeSelectToContain(type.name)
            )
            selectPeriodType(fixedPeriodTypes[1].name) // Click the second item to close the dropdown
        })
        fixedPeriodTypes.forEach(type =>
            it(`'${type.name}' has ${type.amountOfChildren} items`, () => {
                switchFixedPeriodType(type.name)
                type.amountOfChildren > 50
                    ? expectSelectablePeriodsAmountToBeLeast(
                          type.amountOfChildren
                      )
                    : expectSelectablePeriodsAmountToBe(type.amountOfChildren)
            })
        )
    })

    // TODO: Run tests for relative and fixed periods above again but with different intercepted settings and test that the new settings works too
})
