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
    enableLegend,
    expectFixedLegendSetToBe,
    expectLegendDisplayStrategyToBeByDataItem,
    expectLegendDisplayStrategyToBeFixed,
    expectLegendDisplayStyleToBeFill,
    expectLegendDisplayStyleToBeText,
    expectLegendToBeEnabled,
    expectSingleValueToBeColor,
    expectSingleValueToNotBeColor,
    OPTIONS_TAB_LEGEND,
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
    },
    {
        name: 'BCG Coverage <1y',
        legendSet: 'Immunization Coverage',
    },
]

const TEST_LEGEND_SET = 'Height in cm'

describe('Options - Legend', () => {
    describe('Column: applying a legend', () => {
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
            enableLegend()
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
        it('verifies that options are persisted', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeFixed()
            expectFixedLegendSetToBe(TEST_LEGEND_SET)
        })
    })
    describe('Single value: applying a legend', () => {
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
            enableLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        })
        it('legend is applied', () => {
            expectSingleValueToNotBeColor(EXPECTED_STANDARD_TEXT_COLOR)
        })
    })
    describe('Gauge: applying a legend', () => {
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
            enableLegend()
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
        it('verifies that options are persisted', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeFixed()
            expectFixedLegendSetToBe(TEST_LEGEND_SET)
        })
    })
    describe('Pivot table: applying a legend', () => {
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
            enableLegend()
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
        it('verifies that options are persisted', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
        })
    })
    describe('Pivot table -> Gauge: transferring a legend', () => {
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
            enableLegend()
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
    describe('Column -> Single value: transferring a legend', () => {
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
            enableLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it('legend is applied', () => {
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
        it('legend is applied', () => {
            expectSingleValueToNotBeColor(EXPECTED_STANDARD_TEXT_COLOR)
        })
        it('verifies that options are persisted', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
        })
    })
})

/*  TODO:
    - A legend set can be applied to:
        x isLegendSetType types (currently Column and Bar) - only legend strategy
        x SV - only legend strategy
        x Gauge - legend style and legend strategy
        x PT - legend style and legend strategy
    - Other vis types should show the default colors
    - Other vis types should not show the legend tab in options
    x Legend style and strategy options should persist when reopening the modal
    x Legend style and strategy options should persist when changing vis type to another type that supports legends
    x "Fixed legend" list loads and displays properly
    - Legend key can be toggled on and off
    - Series key items show multiple bullets when a legend is in use
*/
