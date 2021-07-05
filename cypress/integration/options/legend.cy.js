import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_PIVOT_TABLE,
    visTypeDisplayNames,
} from '@dhis2/analytics'
import {
    expectChartTitleToBeVisible,
    expectSeriesKeyItemToHaveBullets,
    expectSeriesKeyToHaveSeriesKeyItems,
    expectVisualizationToBeVisible,
} from '../../elements/chart'
import {
    selectIndicators,
    clickDimensionModalUpdateButton,
} from '../../elements/dimensionModal'
import { openDimension } from '../../elements/layout'
import {
    clickMenuBarOptionsButton,
    clickMenuBarUpdateButton,
} from '../../elements/menuBar'
import {
    changeDisplayStrategyToFixed,
    changeDisplayStyleToText,
    changeFixedLegendSet,
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    toggleLegend,
    expectFixedLegendSetToBe,
    expectLegendDisplayStrategyToBeByDataItem,
    expectLegendDisplayStrategyToBeFixed,
    expectLegendDisplayStyleToBeFill,
    expectLegendDisplayStyleToBeText,
    expectLegendToBeEnabled,
    expectSingleValueToBeColor,
    expectSingleValueToNotBeColor,
    OPTIONS_TAB_LEGEND,
    toggleLegendKeyOption,
    expectLegendKeyOptionToBeEnabled,
    expectLegendKeyToBeVisible,
    expectLegendKeyToBeHidden,
    expectLegendKeyOptionToBeDisabled,
} from '../../elements/optionsModal'
import { goToStartPage } from '../../elements/startScreen'
import { changeVisType } from '../../elements/visualizationTypeSelector'
import {
    expectWindowConfigSeriesDataLabelsToHaveColor,
    expectWindowConfigSeriesItemToHaveLegendSet,
    expectWindowConfigYAxisToHaveColor,
} from '../../utils/window'

const TEST_ITEMS = [
    {
        name: 'ANC 1 Coverage',
        legendSet: 'ANC Coverage',
        legends: 7,
    },
    {
        name: 'Diarrhoea <5 y incidence rate (%)',
        legendSet: 'Diarrhoea',
        legends: 6,
    },
]

const TEST_LEGEND_SET = 'Height in cm'

describe('Options - Legend', () => {
    describe('Applying a legend: Column', () => {
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectIndicators(TEST_ITEMS.map(item => item.name))
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        })
        it('enables legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it('legend by data item is applied', () => {
            TEST_ITEMS.forEach(item =>
                expectWindowConfigSeriesItemToHaveLegendSet(
                    item.name,
                    item.legendSet
                )
            )
        })
        it(`changes legend display strategy to fixed (${TEST_LEGEND_SET})`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
            changeDisplayStrategyToFixed()
            expectLegendDisplayStrategyToBeFixed()
            changeFixedLegendSet(TEST_LEGEND_SET)
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it('fixed legend is applied', () => {
            TEST_ITEMS.forEach(item =>
                expectWindowConfigSeriesItemToHaveLegendSet(
                    item.name,
                    TEST_LEGEND_SET
                )
            )
        })
        it('legend key is hidden', () => {
            expectLegendKeyToBeHidden()
        })
        it('verifies that options are persisted', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeFixed()
            expectFixedLegendSetToBe(TEST_LEGEND_SET)
        })
        it('enables legend key option', () => {
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeEnabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible()
        })
        it('legend key is shown', () => {
            expectLegendKeyToBeVisible()
        })
    })
    describe('Applying a legend: Single value', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = '#212934'
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_SINGLE_VALUE])
            openDimension(DIMENSION_ID_DATA)
            selectIndicators([TEST_ITEM.name])
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
            expectSingleValueToBeColor(EXPECTED_STANDARD_TEXT_COLOR)
        })
        it('enables legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        })
        it('legend is applied', () => {
            expectSingleValueToNotBeColor(EXPECTED_STANDARD_TEXT_COLOR)
        })
        it('legend key is hidden', () => {
            expectLegendKeyToBeHidden()
        })
        it('enables legend key option', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeEnabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        })
        it('legend key is shown', () => {
            expectLegendKeyToBeVisible()
        })
    })
    describe('Applying a legend: Gauge', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_BY_DATA_COLOR = '#FFFFB2'
        const EXPECTED_FIXED_COLOR = '#c7e9c0'
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_GAUGE])
            openDimension(DIMENSION_ID_DATA)
            selectIndicators([TEST_ITEM.name])
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_GAUGE)
        })
        it('enables legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            expectLegendDisplayStyleToBeFill()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_GAUGE)
        })
        it('legend by data item is applied', () => {
            expectWindowConfigYAxisToHaveColor(EXPECTED_BY_DATA_COLOR)
        })
        it(`changes legend display strategy to fixed (${TEST_LEGEND_SET})`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
            expectLegendDisplayStyleToBeFill()
            changeDisplayStrategyToFixed()
            expectLegendDisplayStrategyToBeFixed()
            changeFixedLegendSet(TEST_LEGEND_SET)
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_GAUGE)
        })
        it('fixed legend is applied', () => {
            expectWindowConfigYAxisToHaveColor(EXPECTED_FIXED_COLOR)
        })
        it('changes legend display style to text color', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeFixed()
            expectFixedLegendSetToBe(TEST_LEGEND_SET)
            expectLegendDisplayStyleToBeFill()
            changeDisplayStyleToText()
            expectLegendDisplayStyleToBeText()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_GAUGE)
        })
        it('legend style is applied', () => {
            expectWindowConfigSeriesDataLabelsToHaveColor(
                0,
                EXPECTED_FIXED_COLOR
            )
        })
        it('legend key is hidden', () => {
            expectLegendKeyToBeHidden()
        })
        it('verifies that options are persisted', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeFixed()
            expectFixedLegendSetToBe(TEST_LEGEND_SET)
        })
        it('enables legend key option', () => {
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeEnabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_GAUGE)
        })
        it('legend key is shown', () => {
            expectLegendKeyToBeVisible()
        })
    })
    describe('Applying a legend: Pivot table', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = 'color: rgb(33, 41, 52)'
        const valueCellEl = 'visualization-value-cell'
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
            openDimension(DIMENSION_ID_DATA)
            selectIndicators([TEST_ITEM.name])
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        })
        it('no legend is applied', () => {
            cy.getBySel(valueCellEl).each($el => {
                cy.wrap($el)
                    .invoke('attr', 'style')
                    .should('not.contain', 'color')
                    .and('not.contain', 'background-color')
            })
        })
        it('enables legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            expectLegendDisplayStyleToBeFill()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        })
        it('background color legend is applied', () => {
            cy.getBySel(valueCellEl).each($el => {
                cy.wrap($el)
                    .invoke('attr', 'style')
                    .should('contain', 'background-color')
                    .and('contain', EXPECTED_STANDARD_TEXT_COLOR)
            })
        })
        it('changes legend display style to text color', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
            expectLegendDisplayStyleToBeFill()
            changeDisplayStyleToText()
            expectLegendDisplayStyleToBeText()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        })
        it('text color legend is applied', () => {
            cy.getBySel(valueCellEl).each($el => {
                cy.wrap($el)
                    .invoke('attr', 'style')
                    .should('not.contain', 'background-color')
                    .and('not.contain', EXPECTED_STANDARD_TEXT_COLOR)
            })
        })
        it('legend key is hidden', () => {
            expectLegendKeyToBeHidden()
        })
        it('verifies that options are persisted', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
        })
        it('enables legend key option', () => {
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeEnabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        })
        it('legend key is shown', () => {
            expectLegendKeyToBeVisible()
        })
    })
    describe('Transferring a legend: Pivot table -> Gauge', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = 'color: rgb(33, 41, 52)'
        const EXPECTED_FIXED_COLOR = '#c7e9c0'
        const valueCellEl = 'visualization-value-cell'
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
            openDimension(DIMENSION_ID_DATA)
            selectIndicators([TEST_ITEM.name])
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        })
        it('enables legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            expectLegendDisplayStyleToBeFill()
            changeDisplayStyleToText()
            expectLegendDisplayStyleToBeText()
            changeDisplayStrategyToFixed()
            expectLegendDisplayStrategyToBeFixed()
            changeFixedLegendSet(TEST_LEGEND_SET)
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        })
        it(`text color fixed legend (${TEST_LEGEND_SET}) is applied`, () => {
            cy.getBySel(valueCellEl).each($el => {
                cy.wrap($el)
                    .invoke('attr', 'style')
                    .should('not.contain', 'background-color')
                    .and('not.contain', EXPECTED_STANDARD_TEXT_COLOR)
            })
        })
        it('changes vis type to Gauge', () => {
            changeVisType(visTypeDisplayNames[VIS_TYPE_GAUGE])
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_GAUGE)
        })
        it(`text color fixed legend (${TEST_LEGEND_SET}) is applied`, () => {
            expectWindowConfigSeriesDataLabelsToHaveColor(
                0,
                EXPECTED_FIXED_COLOR
            )
        })
        it('verifies that options are persisted', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStyleToBeText()
            expectLegendDisplayStrategyToBeFixed()
        })
    })
    describe('Transferring a legend: Column -> Single value', () => {
        const EXPECTED_STANDARD_TEXT_COLOR = '#212934'
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectIndicators(TEST_ITEMS.map(item => item.name))
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        })
        it('enables legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it('legend is applied to Column', () => {
            TEST_ITEMS.forEach(item =>
                expectWindowConfigSeriesItemToHaveLegendSet(
                    item.name,
                    item.legendSet
                )
            )
        })
        it('changes vis type to Single value', () => {
            changeVisType(visTypeDisplayNames[VIS_TYPE_SINGLE_VALUE])
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        })
        it('legend is applied to Single value', () => {
            expectSingleValueToNotBeColor(EXPECTED_STANDARD_TEXT_COLOR)
        })
        it('verifies that options are persisted', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
        })
    })
    describe('Transferring the legend key: Column -> Pivot table -> Gauge -> Single value', () => {
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectIndicators(TEST_ITEMS.map(item => item.name))
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible()
        })
        it('enables legend (Column)', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible()
        })
        it('legend key is hidden (Column)', () => {
            expectLegendKeyToBeHidden()
        })
        it('enables legend key option (Column)', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeEnabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible()
        })
        it('legend key is shown (Column)', () => {
            expectLegendKeyToBeVisible()
        })
        it('changes vis type to Pivot table', () => {
            changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        })
        it('legend key is shown (Pivot table)', () => {
            expectLegendKeyToBeVisible()
        })
        it('disables legend key option (Pivot table)', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeDisabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        })
        it('legend key is hidden (Pivot table)', () => {
            expectLegendKeyToBeHidden()
        })
        it('changes vis type to Gauge', () => {
            changeVisType(visTypeDisplayNames[VIS_TYPE_GAUGE])
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_GAUGE)
        })
        it('legend key is hidden (Gauge)', () => {
            expectLegendKeyToBeHidden()
        })
        it('enables legend key option (Gauge)', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeEnabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_GAUGE)
        })
        it('legend key is shown (Gauge)', () => {
            expectLegendKeyToBeVisible()
        })
        it('changes vis type to Single value', () => {
            changeVisType(visTypeDisplayNames[VIS_TYPE_SINGLE_VALUE])
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        })
        it('legend key is shown (Single value)', () => {
            expectLegendKeyToBeVisible()
        })
        it('disables legend key option (Single value)', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeDisabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        })
        it('legend key is hidden (Single value)', () => {
            expectLegendKeyToBeHidden()
        })
    })
    describe('The chart series key displaying legend colors', () => {
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectIndicators(TEST_ITEMS.map(item => item.name))
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        })
        it(`series key items displays the correct amount of bullets (1 each)`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(2)
            expectSeriesKeyItemToHaveBullets(0, 1)
            expectSeriesKeyItemToHaveBullets(1, 1)
        })
        it('enables legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it(`series key items displays the correct amount of bullets (first: ${TEST_ITEMS[0].legends}, second: ${TEST_ITEMS[1].legends})`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(2)
            expectSeriesKeyItemToHaveBullets(0, TEST_ITEMS[0].legends)
            expectSeriesKeyItemToHaveBullets(1, TEST_ITEMS[1].legends)
        })
        it(`changes legend display strategy to fixed (${TEST_ITEMS[1].legendSet})`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
            changeDisplayStrategyToFixed()
            expectLegendDisplayStrategyToBeFixed()
            changeFixedLegendSet(TEST_ITEMS[1].legendSet)
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it(`series key displays the correct amount of bullets (${TEST_ITEMS[1].legends} each)`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(2)
            expectSeriesKeyItemToHaveBullets(0, TEST_ITEMS[1].legends)
            expectSeriesKeyItemToHaveBullets(1, TEST_ITEMS[1].legends)
        })
    })
})

/*  TODO:
    - Non-legend vis types should show the default colors
    - Non-legend vis types should not show the legend tab in options
*/
