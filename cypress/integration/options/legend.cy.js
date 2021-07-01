import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_GAUGE,
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
import { clickMenuBarOptionsButton } from '../../elements/menuBar'
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
        const TEXT_COLOR = '#212934'
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_SINGLE_VALUE])
            openDimension(DIMENSION_ID_DATA)
            selectIndicators([TEST_ITEM.name])
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
            cy.getBySel('visualization-primary-value')
                .invoke('attr', 'fill')
                .should('eq', TEXT_COLOR)
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
            cy.getBySel('visualization-primary-value')
                .invoke('attr', 'fill')
                .should('not.eq', TEXT_COLOR)
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
            changeDisplayStyleToText()
        })
    })
})

/*  TODO:
    - A legend set can be applied to:
        x isLegendSetType types (currently Column and Bar) - only legend strategy
        x SV - only legend strategy
        x Gauge - legend style and legend strategy
        - PT - legend style and legend strategy
    - Other vis types should show the default colors
    - Other vis types should not show the legend tab in options
    x Legend style and strategy options should persist when reopening the modal
    - Legend style and strategy options should persist when changing vis type to another type that supports legends
    - "Fixed legend" list loads and displays properly
    - Legend key can be toggled on and off
    - Series key items show multiple bullets when a legend is in use
*/
