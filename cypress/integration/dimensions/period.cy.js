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
    expectSelectablePeriodItemsAmountToBeLeast,
    expectSelectablePeriodItemsAmountToBe,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { goToStartPage } from '../../elements/startScreen.js'

const defaultRelativePeriod = 'Last 3 months'
const systemSettingsBody = {
    keyAnalysisRelativePeriod: 'LAST_3_MONTHS',
    keyAnalysisDigitGroupSeparator: 'COMMA',
    keyHideDailyPeriods: false,
    keyHideWeeklyPeriods: false,
    keyHideBiWeeklyPeriods: false,
    keyHideMonthlyPeriods: false,
    keyHideBiMonthlyPeriods: false,
    keyIgnoreAnalyticsApprovalYearThreshold: -1,
    keyDateFormat: 'yyyy-MM-dd',
}

const systemSettingsInterceptFn = (responseBody) => (req) => {
    req.reply((res) => {
        res.send({ body: responseBody })
    })
}

describe('Period dimension', () => {
    it('has the expected initial state', () => {
        cy.intercept(
            /systemSettings/,
            systemSettingsInterceptFn(systemSettingsBody)
        )

        goToStartPage()

        openDimension(DIMENSION_ID_PERIOD)
        expectPeriodDimensionModalToBeVisible()
        expectDimensionModalToContain('Period')
        expectSelectedItemsAmountToBe(1)
        expectItemToBeSelected(defaultRelativePeriod)
        expectRelativeToBeSelected()
        expectRelativePeriodTypeToBe('Months')

        unselectItemByDoubleClick(defaultRelativePeriod)
        expectNoPeriodsToBeSelected()

        selectItemByDoubleClick(defaultRelativePeriod)
        expectItemToBeSelected(defaultRelativePeriod)

        unselectItemByButton(defaultRelativePeriod)
        expectNoPeriodsToBeSelected()

        selectItemByButton(defaultRelativePeriod)
        expectItemToBeSelected(defaultRelativePeriod)

        selectAllItemsByButton()
        expectSelectedItemsAmountToBe(6)

        unselectAllItemsByButton()
        expectNoPeriodsToBeSelected()

        // periods can be reordered
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

        // relative periods
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

        // relative period types have the correct amount of items
        relativePeriodTypes.forEach((type) => {
            openRelativePeriodsTypeSelect()
            selectPeriodType(type.name)
            expectSelectablePeriodItemsAmountToBe(type.amountOfChildren)
        })

        // fixed periods
        switchToFixedPeriods()
        expectFixedPeriodTypeToBe('Monthly')

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

        // fixed period types have the correct amount of items
        fixedPeriodTypes.forEach((type) => {
            openFixedPeriodsTypeSelect()
            selectPeriodType(type.name)
            type.amountOfChildren > 50
                ? expectSelectablePeriodItemsAmountToBeLeast(
                      type.amountOfChildren
                  )
                : expectSelectablePeriodItemsAmountToBe(type.amountOfChildren)
        })
    })

    describe('using period settings', () => {
        it('works correctly when "monthly" is hidden', () => {
            cy.intercept(
                /systemSettings/,
                systemSettingsInterceptFn({
                    ...systemSettingsBody,
                    keyHideMonthlyPeriods: true,
                })
            )
            goToStartPage()

            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
            expectRelativePeriodTypeToBe('Quarters')

            // relative periods
            openRelativePeriodsTypeSelect()
            expectRelativePeriodTypeSelectToNotContain('Months')

            // all other relative types are shown
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

            // fixed periods
            switchToFixedPeriods()
            expectFixedPeriodTypeToBe('Quarterly')
            openFixedPeriodsTypeSelect()
            expectFixedPeriodTypeSelectToNotContain('Monthly')

            // all other fixed types are shown
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
        it('works correctly when "weekly" is hidden', () => {
            cy.intercept(
                /systemSettings/,
                systemSettingsInterceptFn({
                    ...systemSettingsBody,
                    keyHideWeeklyPeriods: true,
                })
            )
            goToStartPage()

            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
            expectRelativePeriodTypeToBe('Months')

            // relative periods
            openRelativePeriodsTypeSelect()
            expectRelativePeriodTypeSelectToNotContain('Weeks')

            // all other relative types are shown
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

            // fixed periods
            switchToFixedPeriods()
            expectFixedPeriodTypeToBe('Monthly')
            openFixedPeriodsTypeSelect()
            expectFixedPeriodTypeSelectToNotContain('Weekly')
            expectFixedPeriodTypeSelectToNotContain('Weekly (Start Wednesday)')
            expectFixedPeriodTypeSelectToNotContain('Weekly (Start Thursday)')
            expectFixedPeriodTypeSelectToNotContain('Weekly (Start Saturday)')
            expectFixedPeriodTypeSelectToNotContain('Weekly (Start Sunday)')

            // all other fixed types are shown
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
        it('works correctly when "daily" is hidden', () => {
            cy.intercept(
                /systemSettings/,
                systemSettingsInterceptFn({
                    ...systemSettingsBody,
                    keyHideDailyPeriods: true,
                })
            )
            goToStartPage()

            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
            expectRelativePeriodTypeToBe('Months')

            // relative periods
            openRelativePeriodsTypeSelect()
            expectRelativePeriodTypeSelectToNotContain('Days')

            // all other relative types are shown
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

            // fixed periods
            switchToFixedPeriods()
            expectFixedPeriodTypeToBe('Monthly')
            openFixedPeriodsTypeSelect()
            expectFixedPeriodTypeSelectToNotContain('Daily')

            // all other fixed types are shown
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
        it('works when "bi-monthly" is hidden', () => {
            cy.intercept(
                /systemSettings/,
                systemSettingsInterceptFn({
                    ...systemSettingsBody,
                    keyHideBiMonthlyPeriods: true,
                })
            )
            goToStartPage()

            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
            expectRelativePeriodTypeToBe('Months')

            // relative periods
            openRelativePeriodsTypeSelect()
            expectRelativePeriodTypeSelectToNotContain('Bi-months')

            // all other relative types are shown
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

            // fixed periods
            switchToFixedPeriods()
            expectFixedPeriodTypeToBe('Monthly')
            openFixedPeriodsTypeSelect()
            expectFixedPeriodTypeSelectToNotContain('Bi-monthly')

            // all other fixed types are shown
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
        it('works when "bi-weekly" is hidden', () => {
            cy.intercept(
                /systemSettings/,
                systemSettingsInterceptFn({
                    ...systemSettingsBody,
                    keyHideBiWeeklyPeriods: true,
                })
            )
            goToStartPage()

            openDimension(DIMENSION_ID_PERIOD)
            expectPeriodDimensionModalToBeVisible()
            expectRelativePeriodTypeToBe('Months')

            // relative periods
            openRelativePeriodsTypeSelect()
            expectRelativePeriodTypeSelectToNotContain('Bi-weeks')

            // all other relative types are shown
            const relativePeriodTypes = [
                'Days',
                'Weeks',
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

            // fixed periods
            switchToFixedPeriods()
            expectFixedPeriodTypeToBe('Monthly')
            openFixedPeriodsTypeSelect()
            expectFixedPeriodTypeSelectToNotContain('Bi-weekly')

            // all other fixed types are shown
            const fixedPeriodTypes = [
                'Daily',
                'Weekly',
                'Weekly (Start Wednesday)',
                'Weekly (Start Thursday)',
                'Weekly (Start Saturday)',
                'Weekly (Start Sunday)',
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
})
