import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    // VIS_TYPE_SINGLE_VALUE,
    // VIS_TYPE_GAUGE,
    // VIS_TYPE_PIVOT_TABLE,
    // VIS_TYPE_STACKED_COLUMN,
    // VIS_TYPE_LINE,
    // visTypeDisplayNames,
    // DIMENSION_ID_PERIOD,
    // AXIS_ID_COLUMNS,
    // VIS_TYPE_AREA,
    // AXIS_ID_ROWS,
} from '@dhis2/analytics'
import {
    expectChartTitleToBeVisible,
    // expectSeriesKeyToHaveSeriesKeyItems,
    // expectSVSubtitleToHaveColor,
    // expectSVTitleToHaveColor,
    expectVisualizationToBeVisible,
} from '../../elements/chart.js'
import {
    selectIndicators,
    clickDimensionModalUpdateButton,
    // selectRelativePeriods,
    // unselectAllItemsByButton,
} from '../../elements/dimensionModal/index.js'
import {
    // clickContextMenuMove,
    // expectAxisToHaveDimension,
    // openContextMenu,
    openDimension,
} from '../../elements/layout.js'
import {
    // clickMenuBarUpdateButton,
    openOptionsModal,
} from '../../elements/menuBar.js'
import {
    changeDisplayStrategyToFixed,
    //     changeDisplayStyleToText,
    changeFixedLegendSet,
    clickOptionsModalUpdateButton,
    toggleLegend,
    expectFixedLegendSetToBe,
    expectLegendDisplayStrategyToBeByDataItem,
    expectLegendDisplayStrategyToBeFixed,
    //     expectLegendDisplayStyleToBeFill,
    //     expectLegendDisplayStyleToBeText,
    expectLegendToBeEnabled,
    //     expectSingleValueToHaveTextColor,
    OPTIONS_TAB_LEGEND,
    toggleLegendKeyOption,
    expectLegendKeyOptionToBeEnabled,
    expectLegendKeyToBeVisible,
    expectLegendKeyToBeHidden,
    //     expectLegendKeyOptionToBeDisabled,
    //     expectOptionsTabToBeHidden,
    expectLegedKeyItemAmountToBe,
    //     OPTIONS_TAB_SERIES,
    //     setItemToType,
    //     clickOptionsModalHideButton,
    //     expectSingleValueToHaveBackgroundColor,
    //     expectSingleValueToNotHaveBackgroundColor,
    //     changeDisplayStyleToFill,
    //     changeColor,
    //     OPTIONS_TAB_STYLE,
    //     changeDisplayStrategyToByDataItem,
} from '../../elements/optionsModal/index.js'
import { goToStartPage } from '../../elements/startScreen.js'
// import { changeVisType } from '../../elements/visualizationTypeSelector.js'
import {
    //     expectEachWindowConfigSeriesItemToHaveLegendSet,
    //     expectEachWindowConfigSeriesItemToNotHaveLegendSet,
    //     expectWindowConfigSeriesDataLabelsToHaveColor,
    //     expectWindowConfigSeriesItemToBeType,
    expectWindowConfigSeriesItemToHaveLegendSet,
    //     expectWindowConfigSeriesItemToNotHaveLegendSet,
    //     expectWindowConfigSeriesItemToNotHaveType,
    //     expectWindowConfigYAxisToHaveColor,
} from '../../utils/window.js'

const TEST_ITEMS = [
    {
        name: 'ANC 1 Coverage',
        legendSet: 'ANC Coverage',
    },
    {
        name: 'Diarrhoea <5 y incidence rate (%)',
        legendSet: 'Diarrhoea',
    },
]

const TEST_LEGEND_SET = 'Height in cm'

describe('Options - Legend', () => {
    it('Applying a legend: Column', () => {
        // navigates to the start page and add data items
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // enables legend
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        clickOptionsModalUpdateButton()
        expectChartTitleToBeVisible()

        // verifies legend by data item is applied
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToHaveLegendSet(
                item.name,
                item.legendSet
            )
        )

        cy.log(`changes legend display strategy to fixed (${TEST_LEGEND_SET})`)
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()
        changeDisplayStrategyToFixed()
        expectLegendDisplayStrategyToBeFixed()
        changeFixedLegendSet(TEST_LEGEND_SET)
        clickOptionsModalUpdateButton()
        expectChartTitleToBeVisible()

        // verifies fixed legend is applied
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToHaveLegendSet(
                item.name,
                TEST_LEGEND_SET
            )
        )

        // verifies legend key is hidden
        expectLegendKeyToBeHidden()

        // verifies that options are persisted
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectFixedLegendSetToBe(TEST_LEGEND_SET)

        // enables legend key option
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        // verifies legend key is shown with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)
    })
})
