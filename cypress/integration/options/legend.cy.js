import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'
import {
    expectChartTitleToBeVisible,
    expectVisualizationToBeVisible,
} from '../../elements/chart'
import {
    selectIndicators,
    clickDimensionModalUpdateButton,
} from '../../elements/dimensionModal'
import { openDimension } from '../../elements/dimensionsPanel'
import { clickMenuBarOptionsButton } from '../../elements/menuBar'
import {
    changeDisplayStrategyToFixed,
    changeFixedLegendSet,
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    enableLegend,
    expectFixedLegendSetToBe,
    expectLegendDisplayStrategyToBeByDataItem,
    expectLegendDisplayStrategyToBeFixed,
    expectLegendToBeEnabled,
    OPTIONS_TAB_LEGEND,
} from '../../elements/optionsModal'
import { goToStartPage } from '../../elements/startScreen'
import { expectWindowConfigSeriesItemToHaveLegendSet } from '../../utils/window'

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
        it('opens Options -> Legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
        })
        it('enables legend', () => {
            enableLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
        })
        it('clicks the modal update button', () => {
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
        it('opens Options -> Legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
        })
        it('changes legend display strategy to fixed', () => {
            changeDisplayStrategyToFixed()
            expectLegendDisplayStrategyToBeFixed()
        })
        it(`selects fixed legend set ${TEST_LEGEND_SET}`, () => {
            changeFixedLegendSet(TEST_LEGEND_SET)
        })
        it('clicks the modal update button', () => {
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
        it('opens Options -> Legend', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeFixed()
            expectFixedLegendSetToBe(TEST_LEGEND_SET)
        })
    })
})

/*  TODO:
    - A legend set can be applied to:
        - isLegendSetType types (currently Column and Bar) - only legend strategy
        - SV - only legend strategy
        - Gauge - legend style and legend strategy
        - PT - legend style and legend strategy
    - Other vis types should show the default colors
    - Other vis types should not show the legend tab in options
    - Legend style and strategy options should persist when reopening the modal
    - Legend style and strategy options should persist when changing vis type to another type that supports legends
    - "Fixed legend" list loads and displays properly
    - Legend key can be toggled on and off
    - Series key items show multiple bullets when a legend is in use
*/
