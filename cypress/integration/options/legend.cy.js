import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    // VIS_TYPE_GAUGE,
    // VIS_TYPE_PIVOT_TABLE,
    // VIS_TYPE_STACKED_COLUMN,
    // VIS_TYPE_LINE,
    visTypeDisplayNames,
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
    expectLegendDisplayStyleToBeFill,
    //     expectLegendDisplayStyleToBeText,
    expectLegendToBeEnabled,
    expectSingleValueToHaveTextColor,
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
    expectSingleValueToNotHaveBackgroundColor,
    //     changeDisplayStyleToFill,
    //     changeColor,
    //     OPTIONS_TAB_STYLE,
    //     changeDisplayStrategyToByDataItem,
} from '../../elements/optionsModal/index.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'
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

    it('Applying a legend: Single value', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = '#212934'
        // const EXPECTED_CONTRAST_TEXT_COLOR = '#ffffff'
        // const EXPECTED_BACKGROUND_COLOR_1 = '#FFFFB2'
        // const EXPECTED_TEXT_COLOR_1 = '#FFFFB2'
        // const EXPECTED_BACKGROUND_COLOR_2 = '#B3402B'
        // const EXPECTED_TEXT_COLOR_2 = '#B3402B'
        // const EXPECTED_CUSTOM_TITLE_COLOR = '#ff7700'
        // const EXPECTED_CUSTOM_SUBTITLE_COLOR = '#ffaa00'
        // const TEST_LEGEND_SET_WITH_CONTRAST = 'Age 15y interval'
        // const EXPECTED_STANDARD_TITLE_COLOR = '#212934'
        // const EXPECTED_STANDARD_SUBTITLE_COLOR = '#4a5768'

        // navigates to the start page and adds data items
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_SINGLE_VALUE])
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        expectSingleValueToHaveTextColor(EXPECTED_STANDARD_TEXT_COLOR)
        expectSingleValueToNotHaveBackgroundColor()

        // enables legend
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // // Legend on background, no contrast, no custom title colors
        // // verifies background color legend is applied
        // expectSingleValueToHaveTextColor(EXPECTED_STANDARD_TEXT_COLOR)
        // expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_1)
        // expectSVTitleToHaveColor(EXPECTED_STANDARD_TITLE_COLOR)
        // expectSVSubtitleToHaveColor(EXPECTED_STANDARD_SUBTITLE_COLOR)

        // // changes legend display style to text color
        // openOptionsModal(OPTIONS_TAB_LEGEND)
        // expectLegendDisplayStrategyToBeByDataItem()
        // expectLegendDisplayStyleToBeFill()
        // changeDisplayStyleToText()
        // expectLegendDisplayStyleToBeText()
        // clickOptionsModalUpdateButton()
        // expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // // Legend on text, no contrast, no custom title colors
        // // verifies text color legend is applied
        // expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_1)
        // expectSingleValueToNotHaveBackgroundColor()
        // expectSVTitleToHaveColor(EXPECTED_STANDARD_TITLE_COLOR)
        // expectSVSubtitleToHaveColor(EXPECTED_STANDARD_SUBTITLE_COLOR)

        // cy.log(
        //     `changes legend display strategy to fixed ${TEST_LEGEND_SET_WITH_CONTRAST}`
        // )
        // openOptionsModal(OPTIONS_TAB_LEGEND)
        // expectLegendDisplayStyleToBeText()
        // expectLegendDisplayStrategyToBeByDataItem()
        // changeDisplayStrategyToFixed()
        // expectLegendDisplayStrategyToBeFixed()
        // changeFixedLegendSet(TEST_LEGEND_SET_WITH_CONTRAST)
        // clickOptionsModalUpdateButton()
        // expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // // Legend on text, with contrast (N/, no custom title colors
        // // verifies text color legend is applied
        // expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_2)
        // expectSingleValueToNotHaveBackgroundColor()
        // expectSVTitleToHaveColor(EXPECTED_STANDARD_TITLE_COLOR)
        // expectSVSubtitleToHaveColor(EXPECTED_STANDARD_SUBTITLE_COLOR)

        // // changees legend display style to background color
        // openOptionsModal(OPTIONS_TAB_LEGEND)
        // expectLegendDisplayStrategyToBeFixed()
        // expectLegendDisplayStyleToBeText()
        // changeDisplayStyleToFill()
        // expectLegendDisplayStyleToBeFill()
        // clickOptionsModalUpdateButton()
        // expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // // Legend on background, with contrast, no custom title colors
        // // verifies background color legend and contrast text color is applied
        // expectSingleValueToHaveTextColor(EXPECTED_CONTRAST_TEXT_COLOR)
        // expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_2)
        // expectSVTitleToHaveColor(EXPECTED_CONTRAST_TEXT_COLOR)
        // expectSVSubtitleToHaveColor(EXPECTED_CONTRAST_TEXT_COLOR)

        // // changes title and subtitle colors
        // openOptionsModal(OPTIONS_TAB_STYLE)
        // changeColor('option-chart-title', EXPECTED_CUSTOM_TITLE_COLOR)
        // changeColor('option-chart-subtitle', EXPECTED_CUSTOM_SUBTITLE_COLOR)
        // clickOptionsModalUpdateButton()

        // // Legend on background, with contrast, with custom title colo
        // // verifies background color legend, contrast text color and custom title colors are applied
        // expectSingleValueToHaveTextColor(EXPECTED_CONTRAST_TEXT_COLOR)
        // expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_2)
        // expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR)
        // expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR)

        // // changes legend display style to text color
        // openOptionsModal(OPTIONS_TAB_LEGEND)
        // expectLegendDisplayStrategyToBeFixed()
        // expectLegendDisplayStyleToBeFill()
        // changeDisplayStyleToText()
        // expectLegendDisplayStyleToBeText()
        // clickOptionsModalUpdateButton()
        // expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // // Legend on text, with contrast, with custom title colo
        // // verifies text color legend and custom title colors are applied
        // expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_2)
        // expectSingleValueToNotHaveBackgroundColor()
        // expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR)
        // expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR)

        // // changes legend display strategy to by data item
        // openOptionsModal(OPTIONS_TAB_LEGEND)
        // expectLegendDisplayStyleToBeText()
        // expectLegendDisplayStrategyToBeFixed()
        // changeDisplayStrategyToByDataItem()
        // expectLegendDisplayStrategyToBeByDataItem()
        // clickOptionsModalUpdateButton()
        // expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // // Legend on text, no contrast, with custom title colo
        // // verifies text color legend and custom title colors are applied
        // expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_1)
        // expectSingleValueToNotHaveBackgroundColor()
        // expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR)
        // expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR)

        // // changes legend display style to background color
        // openOptionsModal(OPTIONS_TAB_LEGEND)
        // changeDisplayStrategyToByDataItem()
        // expectLegendDisplayStyleToBeText()
        // changeDisplayStyleToFill()
        // expectLegendDisplayStyleToBeFill()
        // clickOptionsModalUpdateButton()
        // expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // // Legend on background, no contrast, with custom title colors
        // // verifies background color legend and custom title colors are applied
        // expectSingleValueToHaveTextColor(EXPECTED_STANDARD_TEXT_COLOR)
        // expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_1)
        // expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR)
        // expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR)

        // // verifies legend key is hidden
        // expectLegendKeyToBeHidden()

        // // enables legend key option
        // openOptionsModal(OPTIONS_TAB_LEGEND)
        // toggleLegendKeyOption()
        // expectLegendKeyOptionToBeEnabled()
        // clickOptionsModalUpdateButton()
        // expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // // verifies legend key is shown with 1 item
        // expectLegendKeyToBeVisible()
        // expectLegedKeyItemAmountToBe(1)
    })
})
