import { DIMENSION_ID_PERIOD } from '@dhis2/analytics'
import {
    expectDimensionModalToContain,
    expectPeriodDimensionModalToBeVisible,
    expectSelectedItemsAmountToBe,
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
    openRelativePeriodsTypeSelect,
    selectPeriodType,
    unselectAllItemsByButton,
    switchToFixedPeriods,
    openFixedPeriodsTypeSelect,
    expectRelativePeriodTypeSelectToNotContain,
    expectFixedPeriodTypeSelectToNotContain,
    expectFixedPeriodTypeToBe,
    selectAllItemsByButton,
    expectFirstSelectedItemToBe,
    clickMoveUpButton,
    clickMoveDownButton,
    singleClickSelectedItem,
    expectSelectableItemsAmountToBeLeast,
    expectSelectableItemsAmountToBe,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { goToStartPage } from '../../elements/startScreen.js'

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
                (req) => {
                    req.reply((res) => {
                        res.send({ body: systemSettingsBody })
                    })
                }
            )
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
            expectSelectedItemsAmountToBe(1)
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
        it('all can be selected by button', () => {
            selectAllItemsByButton()
            expectSelectedItemsAmountToBe(6)
        })
        it('all can be unselected by button', () => {
            unselectAllItemsByButton()
            expectNoPeriodsToBeSelected()
        })
        it('periods can be reordered', () => {
            const itemA = 'This month'
            const itemB = 'Last month'
            selectItemByDoubleClick(itemA)
            selectItemByDoubleClick(itemB)
            expectFirstSelectedItemToBe(itemA)
            singleClickSelectedItem(itemB)
            clickMoveUpButton(itemB)
            expectFirstSelectedItemToBe(itemB)
            clickMoveDownButton(itemB)
            expectFirstSelectedItemToBe(itemA)
            unselectAllItemsByButton()
        })
        const relativePeriodTypes = [
            { name: 'Days', amountOfChildren: 9 },
            { name: 'Weeks', amountOfChildren: 6 },
            { name: 'Bi-weeks', amountOfChildren: 3 },
            { name: 'Months', amountOfChildren: 6 },
            { name: 'Bi-months', amountOfChildren: 4 },
            { name: 'Quarters', amountOfChildren: 4 },
            { name: 'Six-months', amountOfChildren: 3 },
            { name: 'Financial Years', amountOfChildren: 3 },
            { name: 'Years', amountOfChildren: 4 },
        ]
        relativePeriodTypes.forEach((type) =>
            it(`relative period type '${type.name}' has ${type.amountOfChildren} items`, () => {
                openRelativePeriodsTypeSelect()
                selectPeriodType(type.name)
                expectSelectableItemsAmountToBe(type.amountOfChildren)
            })
        )
        it('can switch to fixed periods', () => {
            switchToFixedPeriods()
        })
        it("period type is 'Monthly'", () => {
            expectFixedPeriodTypeToBe('Monthly')
        })
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
        fixedPeriodTypes.forEach((type) =>
            it(`fixed period type '${type.name}' has ${type.amountOfChildren} items`, () => {
                openFixedPeriodsTypeSelect()
                selectPeriodType(type.name)
                type.amountOfChildren > 50
                    ? expectSelectableItemsAmountToBeLeast(
                          type.amountOfChildren
                      )
                    : expectSelectableItemsAmountToBe(type.amountOfChildren)
            })
        )
    })
    describe('using period settings - hidden monthly', () => {
        it('navigates to the start page', () => {
            cy.intercept(
                /systemSettings(\S)*keyAnalysisRelativePeriod(\S)*/,
                (req) => {
                    req.reply((res) => {
                        res.send({
                            body: {
                                ...systemSettingsBody,
                                keyHideMonthlyPeriods: true,
                            },
                        })
                    })
                }
            )
            goToStartPage()
        })
        it('opens the period dimension modal', () => {
            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
        })
        it("period type is 'Quarters'", () => {
            expectRelativePeriodTypeToBe('Quarters')
        })
        it("relative type 'Months' is not shown", () => {
            openRelativePeriodsTypeSelect()
            expectRelativePeriodTypeSelectToNotContain('Months')
        })
        it('all other relative types are shown', () => {
            const relativePeriodTypes = [
                'Days',
                'Weeks',
                'Bi-weeks',
                'Bi-months',
                'Quarters',
                'Six-months',
                'Financial Years',
                'Years',
            ]
            relativePeriodTypes.forEach((type) =>
                expectRelativePeriodTypeSelectToContain(type)
            )
            selectPeriodType(relativePeriodTypes.slice(-1)[0]) // Click the last item to close the dropdown
        })
        it('can switch to fixed periods', () => {
            switchToFixedPeriods()
        })
        it("period type is 'Quarterly'", () => {
            expectFixedPeriodTypeToBe('Quarterly')
        })
        it("fixed type 'Monthly' is not shown", () => {
            openFixedPeriodsTypeSelect()
            expectFixedPeriodTypeSelectToNotContain('Monthly')
        })
        it('all other fixed types are shown', () => {
            const fixedPeriodTypes = [
                'Daily',
                'Weekly',
                'Weekly (Start Wednesday)',
                'Weekly (Start Thursday)',
                'Weekly (Start Saturday)',
                'Weekly (Start Sunday)',
                'Bi-weekly',
                'Bi-monthly',
                'Quarterly',
                'Six-monthly',
                'Six-monthly April',
                'Yearly',
                'Financial year (Start November)',
                'Financial year (Start October)',
                'Financial year (Start July)',
                'Financial year (Start April)',
            ]
            fixedPeriodTypes.forEach((type) =>
                expectFixedPeriodTypeSelectToContain(type)
            )
            selectPeriodType(fixedPeriodTypes[1]) // Click the second item to close the dropdown
        })
    })
    describe('using period settings - hidden weekly', () => {
        it('navigates to the start page', () => {
            cy.intercept(
                /systemSettings(\S)*keyAnalysisRelativePeriod(\S)*/,
                (req) => {
                    req.reply((res) => {
                        res.send({
                            body: {
                                ...systemSettingsBody,
                                keyHideWeeklyPeriods: true,
                            },
                        })
                    })
                }
            )
            goToStartPage()
        })
        it('opens the period dimension modal', () => {
            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
        })
        it("period type is 'Months'", () => {
            expectRelativePeriodTypeToBe('Months')
        })
        it("relative type 'Weeks' is not shown", () => {
            openRelativePeriodsTypeSelect()
            expectRelativePeriodTypeSelectToNotContain('Weeks')
        })
        it('all other relative types are shown', () => {
            const relativePeriodTypes = [
                'Days',
                'Bi-weeks',
                'Months',
                'Bi-months',
                'Quarters',
                'Six-months',
                'Financial Years',
                'Years',
            ]
            relativePeriodTypes.forEach((type) =>
                expectRelativePeriodTypeSelectToContain(type)
            )
            selectPeriodType(relativePeriodTypes.slice(-1)[0]) // Click the last item to close the dropdown
        })
        it('can switch to fixed periods', () => {
            switchToFixedPeriods()
        })
        it("period type is 'Monthly'", () => {
            expectFixedPeriodTypeToBe('Monthly')
        })
        it("fixed type 'Weekly' and other weekly based periods are not shown", () => {
            openFixedPeriodsTypeSelect()
            expectFixedPeriodTypeSelectToNotContain('Weekly')
            expectFixedPeriodTypeSelectToNotContain('Weekly (Start Wednesday)')
            expectFixedPeriodTypeSelectToNotContain('Weekly (Start Thursday)')
            expectFixedPeriodTypeSelectToNotContain('Weekly (Start Saturday)')
            expectFixedPeriodTypeSelectToNotContain('Weekly (Start Sunday)')
        })
        it('all other fixed types are shown', () => {
            const fixedPeriodTypes = [
                'Daily',
                'Bi-weekly',
                'Monthly',
                'Bi-monthly',
                'Quarterly',
                'Six-monthly',
                'Six-monthly April',
                'Yearly',
                'Financial year (Start November)',
                'Financial year (Start October)',
                'Financial year (Start July)',
                'Financial year (Start April)',
            ]
            fixedPeriodTypes.forEach((type) =>
                expectFixedPeriodTypeSelectToContain(type)
            )
            selectPeriodType(fixedPeriodTypes[1]) // Click the second item to close the dropdown
        })
    })
    describe('using period settings - hidden daily', () => {
        it('navigates to the start page', () => {
            cy.intercept(
                /systemSettings(\S)*keyAnalysisRelativePeriod(\S)*/,
                (req) => {
                    req.reply((res) => {
                        res.send({
                            body: {
                                ...systemSettingsBody,
                                keyHideDailyPeriods: true,
                            },
                        })
                    })
                }
            )
            goToStartPage()
        })
        it('opens the period dimension modal', () => {
            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
        })
        it("period type is 'Months'", () => {
            expectRelativePeriodTypeToBe('Months')
        })
        it("relative type 'Days' is not shown", () => {
            openRelativePeriodsTypeSelect()
            expectRelativePeriodTypeSelectToNotContain('Days')
        })
        it('all other relative types are shown', () => {
            const relativePeriodTypes = [
                'Weeks',
                'Bi-weeks',
                'Months',
                'Bi-months',
                'Quarters',
                'Six-months',
                'Financial Years',
                'Years',
            ]
            relativePeriodTypes.forEach((type) =>
                expectRelativePeriodTypeSelectToContain(type)
            )
            selectPeriodType(relativePeriodTypes.slice(-1)[0]) // Click the last item to close the dropdown
        })
        it('can switch to fixed periods', () => {
            switchToFixedPeriods()
        })
        it("period type is 'Monthly'", () => {
            expectFixedPeriodTypeToBe('Monthly')
        })
        it("fixed type 'Daily' is not shown", () => {
            openFixedPeriodsTypeSelect()
            expectFixedPeriodTypeSelectToNotContain('Daily')
        })
        it('all other fixed types are shown', () => {
            const fixedPeriodTypes = [
                'Weekly',
                'Weekly (Start Wednesday)',
                'Weekly (Start Thursday)',
                'Weekly (Start Saturday)',
                'Weekly (Start Sunday)',
                'Bi-weekly',
                'Monthly',
                'Bi-monthly',
                'Quarterly',
                'Six-monthly',
                'Six-monthly April',
                'Yearly',
                'Financial year (Start November)',
                'Financial year (Start October)',
                'Financial year (Start July)',
                'Financial year (Start April)',
            ]
            fixedPeriodTypes.forEach((type) =>
                expectFixedPeriodTypeSelectToContain(type)
            )
            selectPeriodType(fixedPeriodTypes[1]) // Click the second item to close the dropdown
        })
    })
    describe('using period settings - hidden bi-monthly', () => {
        it('navigates to the start page', () => {
            cy.intercept(
                /systemSettings(\S)*keyAnalysisRelativePeriod(\S)*/,
                (req) => {
                    req.reply((res) => {
                        res.send({
                            body: {
                                ...systemSettingsBody,
                                keyHideBiMonthlyPeriods: true,
                            },
                        })
                    })
                }
            )
            goToStartPage()
        })
        it('opens the period dimension modal', () => {
            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
        })
        it("period type is 'Months'", () => {
            expectRelativePeriodTypeToBe('Months')
        })
        it("relative type 'Bi-months' is not shown", () => {
            openRelativePeriodsTypeSelect()
            expectRelativePeriodTypeSelectToNotContain('Bi-months')
        })
        it('all other relative types are shown', () => {
            const relativePeriodTypes = [
                'Days',
                'Weeks',
                'Bi-weeks',
                'Months',
                'Quarters',
                'Six-months',
                'Financial Years',
                'Years',
            ]
            relativePeriodTypes.forEach((type) =>
                expectRelativePeriodTypeSelectToContain(type)
            )
            selectPeriodType(relativePeriodTypes.slice(-1)[0]) // Click the last item to close the dropdown
        })
        it('can switch to fixed periods', () => {
            switchToFixedPeriods()
        })
        it("period type is 'Monthly'", () => {
            expectFixedPeriodTypeToBe('Monthly')
        })
        it("fixed type 'Bi-monthly' is not shown", () => {
            openFixedPeriodsTypeSelect()
            expectFixedPeriodTypeSelectToNotContain('Bi-monthly')
        })
        it('all other fixed types are shown', () => {
            const fixedPeriodTypes = [
                'Daily',
                'Weekly',
                'Weekly (Start Wednesday)',
                'Weekly (Start Thursday)',
                'Weekly (Start Saturday)',
                'Weekly (Start Sunday)',
                'Bi-weekly',
                'Monthly',
                'Quarterly',
                'Six-monthly',
                'Six-monthly April',
                'Yearly',
                'Financial year (Start November)',
                'Financial year (Start October)',
                'Financial year (Start July)',
                'Financial year (Start April)',
            ]
            fixedPeriodTypes.forEach((type) =>
                expectFixedPeriodTypeSelectToContain(type)
            )
            selectPeriodType(fixedPeriodTypes[1]) // Click the second item to close the dropdown
        })
    })
})
