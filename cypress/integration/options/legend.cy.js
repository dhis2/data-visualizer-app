import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_LINE,
    visTypeDisplayNames,
    DIMENSION_ID_PERIOD,
    AXIS_ID_COLUMNS,
    VIS_TYPE_AREA,
    AXIS_ID_ROWS,
} from '@dhis2/analytics'
import {
    expectChartTitleToBeVisible,
    expectSeriesKeyToHaveSeriesKeyItems,
    expectSVSubtitleToHaveColor,
    expectSVTitleToHaveColor,
    expectVisualizationToBeVisible,
} from '../../elements/chart.js'
import {
    selectIndicators,
    clickDimensionModalUpdateButton,
    selectRelativePeriods,
    unselectAllItemsByButton,
} from '../../elements/dimensionModal/index.js'
import {
    clickContextMenuMove,
    expectAxisToHaveDimension,
    openContextMenu,
    openDimension,
} from '../../elements/layout.js'
import {
    clickMenuBarUpdateButton,
    openOptionsModal,
} from '../../elements/menuBar.js'
import {
    changeDisplayStrategyToFixed,
    changeDisplayStyleToText,
    changeFixedLegendSet,
    clickOptionsModalUpdateButton,
    toggleLegend,
    expectFixedLegendSetToBe,
    expectLegendDisplayStrategyToBeByDataItem,
    expectLegendDisplayStrategyToBeFixed,
    expectLegendDisplayStyleToBeFill,
    expectLegendDisplayStyleToBeText,
    expectLegendToBeEnabled,
    expectSingleValueToHaveTextColor,
    OPTIONS_TAB_LEGEND,
    toggleLegendKeyOption,
    expectLegendKeyOptionToBeEnabled,
    expectLegendKeyToBeVisible,
    expectLegendKeyToBeHidden,
    expectLegendKeyOptionToBeDisabled,
    expectOptionsTabToBeHidden,
    expectLegedKeyItemAmountToBe,
    OPTIONS_TAB_SERIES,
    setItemToType,
    clickOptionsModalHideButton,
    expectSingleValueToHaveBackgroundColor,
    expectSingleValueToNotHaveBackgroundColor,
    changeDisplayStyleToFill,
    changeColor,
    OPTIONS_TAB_STYLE,
    changeDisplayStrategyToByDataItem,
} from '../../elements/optionsModal/index.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'
import {
    expectEachWindowConfigSeriesItemToHaveLegendSet,
    expectEachWindowConfigSeriesItemToNotHaveLegendSet,
    expectWindowConfigSeriesDataLabelsToHaveColor,
    expectWindowConfigSeriesItemToBeType,
    expectWindowConfigSeriesItemToHaveLegendSet,
    expectWindowConfigSeriesItemToNotHaveLegendSet,
    expectWindowConfigSeriesItemToNotHaveType,
    expectWindowConfigYAxisToHaveColor,
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
    it.only('Applying a legend: Column', () => {
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

    it.skip('Applying a legend: Single value', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = '#212934'
        const EXPECTED_CONTRAST_TEXT_COLOR = '#ffffff'
        const EXPECTED_BACKGROUND_COLOR_1 = '#FFFFB2'
        const EXPECTED_TEXT_COLOR_1 = '#FFFFB2'
        const EXPECTED_BACKGROUND_COLOR_2 = '#B3402B'
        const EXPECTED_TEXT_COLOR_2 = '#B3402B'
        const EXPECTED_CUSTOM_TITLE_COLOR = '#ff7700'
        const EXPECTED_CUSTOM_SUBTITLE_COLOR = '#ffaa00'
        const TEST_LEGEND_SET_WITH_CONTRAST = 'Age 15y interval'
        const EXPECTED_STANDARD_TITLE_COLOR = '#212934'
        const EXPECTED_STANDARD_SUBTITLE_COLOR = '#4a5768'

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

        // Legend on background, no contrast, no custom title colors
        // verifies background color legend is applied
        expectSingleValueToHaveTextColor(EXPECTED_STANDARD_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_1)
        expectSVTitleToHaveColor(EXPECTED_STANDARD_TITLE_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_STANDARD_SUBTITLE_COLOR)

        // changes legend display style to text color
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        changeDisplayStyleToText()
        expectLegendDisplayStyleToBeText()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on text, no contrast, no custom title colors
        // verifies text color legend is applied
        expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_1)
        expectSingleValueToNotHaveBackgroundColor()
        expectSVTitleToHaveColor(EXPECTED_STANDARD_TITLE_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_STANDARD_SUBTITLE_COLOR)

        cy.log(
            `changes legend display strategy to fixed ${TEST_LEGEND_SET_WITH_CONTRAST}`
        )
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStyleToBeText()
        expectLegendDisplayStrategyToBeByDataItem()
        changeDisplayStrategyToFixed()
        expectLegendDisplayStrategyToBeFixed()
        changeFixedLegendSet(TEST_LEGEND_SET_WITH_CONTRAST)
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on text, with contrast (N/, no custom title colors
        // verifies text color legend is applied
        expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_2)
        expectSingleValueToNotHaveBackgroundColor()
        expectSVTitleToHaveColor(EXPECTED_STANDARD_TITLE_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_STANDARD_SUBTITLE_COLOR)

        // changees legend display style to background color
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectLegendDisplayStyleToBeText()
        changeDisplayStyleToFill()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on background, with contrast, no custom title colors
        // verifies background color legend and contrast text color is applied
        expectSingleValueToHaveTextColor(EXPECTED_CONTRAST_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_2)
        expectSVTitleToHaveColor(EXPECTED_CONTRAST_TEXT_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_CONTRAST_TEXT_COLOR)

        // changes title and subtitle colors
        openOptionsModal(OPTIONS_TAB_STYLE)
        changeColor('option-chart-title', EXPECTED_CUSTOM_TITLE_COLOR)
        changeColor('option-chart-subtitle', EXPECTED_CUSTOM_SUBTITLE_COLOR)
        clickOptionsModalUpdateButton()

        // Legend on background, with contrast, with custom title colo
        // verifies background color legend, contrast text color and custom title colors are applied
        expectSingleValueToHaveTextColor(EXPECTED_CONTRAST_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_2)
        expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR)

        // changes legend display style to text color
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectLegendDisplayStyleToBeFill()
        changeDisplayStyleToText()
        expectLegendDisplayStyleToBeText()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on text, with contrast, with custom title colo
        // verifies text color legend and custom title colors are applied
        expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_2)
        expectSingleValueToNotHaveBackgroundColor()
        expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR)

        // changes legend display strategy to by data item
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStyleToBeText()
        expectLegendDisplayStrategyToBeFixed()
        changeDisplayStrategyToByDataItem()
        expectLegendDisplayStrategyToBeByDataItem()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on text, no contrast, with custom title colo
        // verifies text color legend and custom title colors are applied
        expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_1)
        expectSingleValueToNotHaveBackgroundColor()
        expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR)

        // changes legend display style to background color
        openOptionsModal(OPTIONS_TAB_LEGEND)
        changeDisplayStrategyToByDataItem()
        expectLegendDisplayStyleToBeText()
        changeDisplayStyleToFill()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on background, no contrast, with custom title colors
        // verifies background color legend and custom title colors are applied
        expectSingleValueToHaveTextColor(EXPECTED_STANDARD_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_1)
        expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR)

        // verifies legend key is hidden
        expectLegendKeyToBeHidden()

        // enables legend key option
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // verifies legend key is shown with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)
    })
    it.skip('Applying a legend: Gauge', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_BY_DATA_COLOR = '#FFFFB2'
        const EXPECTED_FIXED_COLOR = '#c7e9c0'

        // navigates to the start page and adds data items
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_GAUGE])
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        // enables legend
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        // legend by data item is applied
        expectWindowConfigYAxisToHaveColor(EXPECTED_BY_DATA_COLOR)

        cy.log(`changes legend display strategy to fixed (${TEST_LEGEND_SET})`)
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        changeDisplayStrategyToFixed()
        expectLegendDisplayStrategyToBeFixed()
        changeFixedLegendSet(TEST_LEGEND_SET)
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        // fixed legend is applied
        expectWindowConfigYAxisToHaveColor(EXPECTED_FIXED_COLOR)

        // changes legend display style to text color
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectFixedLegendSetToBe(TEST_LEGEND_SET)
        expectLegendDisplayStyleToBeFill()
        changeDisplayStyleToText()
        expectLegendDisplayStyleToBeText()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        // legend style is applied
        expectWindowConfigSeriesDataLabelsToHaveColor(0, EXPECTED_FIXED_COLOR)

        // legend key is hidden
        expectLegendKeyToBeHidden()

        // verifies that options are persisted
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectFixedLegendSetToBe(TEST_LEGEND_SET)

        // enables legend key option
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        // legend key is shown with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)
    })
    it.skip('Applying a legend: Stacked column', () => {
        // navigates to the start page and adds data items
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_STACKED_COLUMN])
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_STACKED_COLUMN)

        // enables legend
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        clickOptionsModalUpdateButton()
        expectChartTitleToBeVisible()

        // legend by data item is applied
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

        // fixed legend is applied
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToHaveLegendSet(
                item.name,
                TEST_LEGEND_SET
            )
        )

        // legend key is hidden
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

        // legend key is shown with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)
    })
    describe('Applying a legend: Pivot table', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = 'color: rgb(33, 41, 52)'
        const valueCellEl = 'visualization-value-cell'

        // navigates to the start page and adds data items
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        // no legend is applied
        cy.getBySel(valueCellEl).each(($el) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .should('not.contain', 'color')
                .and('not.contain', 'background-color')
        })

        // enables legend
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        // background color legend is applied
        cy.getBySel(valueCellEl).each(($el) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .should('contain', 'background-color')
                .and('contain', EXPECTED_STANDARD_TEXT_COLOR)
        })

        // changes legend display style to text color
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        changeDisplayStyleToText()
        expectLegendDisplayStyleToBeText()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        // text color legend is applied
        cy.getBySel(valueCellEl).each(($el) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .should('not.contain', 'background-color')
                .and('not.contain', EXPECTED_STANDARD_TEXT_COLOR)
        })

        // legend key is hidden
        expectLegendKeyToBeHidden()

        // verifies that options are persisted
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()

        // enables legend key option
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        // legend key is shown with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        // legend is applied when data is in rows
        // swap data and period
        openContextMenu(DIMENSION_ID_PERIOD)
        clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_COLUMNS)
        openContextMenu(DIMENSION_ID_DATA)
        clickContextMenuMove(DIMENSION_ID_DATA, AXIS_ID_ROWS)
        clickMenuBarUpdateButton()

        // expect legend to still be applied
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)
        cy.getBySel(valueCellEl).each(($el) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .should('not.contain', 'background-color')
                .and('not.contain', EXPECTED_STANDARD_TEXT_COLOR)
        })
    })
    it.skip('Transferring a legend: Pivot table -> Gauge', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = 'color: rgb(33, 41, 52)'
        const EXPECTED_FIXED_COLOR = '#c7e9c0'
        const valueCellEl = 'visualization-value-cell'

        // navigates to the start page and adds data items
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        // enables legend
        openOptionsModal(OPTIONS_TAB_LEGEND)
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

        cy.log(`text color fixed legend (${TEST_LEGEND_SET}) is applied`)
        cy.getBySel(valueCellEl).each(($el) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .should('not.contain', 'background-color')
                .and('not.contain', EXPECTED_STANDARD_TEXT_COLOR)
        })

        // changes vis type to Gauge
        changeVisType(visTypeDisplayNames[VIS_TYPE_GAUGE])
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        cy.log(`text color fixed legend (${TEST_LEGEND_SET}) is applied`)
        expectWindowConfigSeriesDataLabelsToHaveColor(0, EXPECTED_FIXED_COLOR)

        // verifies that options are persisted
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStyleToBeText()
        expectLegendDisplayStrategyToBeFixed()
    })
    it.skip('Transferring a legend: Pivot table -> Single value', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_FIXED_COLOR = '#c7e9c0'
        const valueCellEl = 'visualization-value-cell'
        const EXPECTED_SV_STANDARD_TEXT_COLOR = '#212934'
        const EXPECTED_PT_STANDARD_TEXT_COLOR = 'color: rgb(33, 41, 52)'

        // navigates to the start page and adds data items
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        // enables legend
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        changeDisplayStrategyToFixed()
        expectLegendDisplayStrategyToBeFixed()
        changeFixedLegendSet(TEST_LEGEND_SET)
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log(`background color fixed legend (${TEST_LEGEND_SET}) is applied`)
        cy.getBySel(valueCellEl).each(($el) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .should('contain', 'background-color')
                .and('contain', EXPECTED_PT_STANDARD_TEXT_COLOR)
        })

        // changes vis type to Single value
        changeVisType(visTypeDisplayNames[VIS_TYPE_SINGLE_VALUE])
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // legend is applied to Single value
        expectSingleValueToHaveTextColor(EXPECTED_SV_STANDARD_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_FIXED_COLOR)

        // verifies that options are persisted
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStyleToBeFill()
        expectLegendDisplayStrategyToBeFixed()
    })
    it.skip('Transferring the legend key: Column -> Pivot table -> Gauge -> Single value', () => {
        // navigates to the start page and adds data items
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible()

        // enables legend (Column)
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        // legend key is hidden (Column)
        expectLegendKeyToBeHidden()

        // enables legend key option (Column)
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        cy.log(`legend key is shown (Column) with ${TEST_ITEMS.length} items`)
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(TEST_ITEMS.length)

        // changes vis type to Pivot table
        changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log(
            `legend key is shown (Pivot table) with ${TEST_ITEMS.length} items`
        )
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(TEST_ITEMS.length)

        // disables legend key option (Pivot table)
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeDisabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        // legend key is hidden (Pivot table)
        expectLegendKeyToBeHidden()

        // changes vis type to Gauge
        changeVisType(visTypeDisplayNames[VIS_TYPE_GAUGE])
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        // legend key is hidden (Gauge)
        expectLegendKeyToBeHidden()

        // enables legend key option (Gauge)
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        // legend key is shown (Gauge) with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        // changes vis type to Single value
        changeVisType(visTypeDisplayNames[VIS_TYPE_SINGLE_VALUE])
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // legend key is shown (Single value) with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        // disables legend key option (Single value)
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeDisabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // legend key is hidden (Single value)
        expectLegendKeyToBeHidden()
    })
    it.skip('Preventing options bleed: Column -> Area', () => {
        // navigates to the start page and adds data items
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

        // legend is applied to Column
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToHaveLegendSet(
                item.name,
                item.legendSet
            )
        )

        // changes vis type to Area
        changeVisType(visTypeDisplayNames[VIS_TYPE_AREA])
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_AREA)

        // legend is not applied to Area
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToNotHaveLegendSet(item.name)
        )

        // legend options are not available
        openOptionsModal()
        expectOptionsTabToBeHidden(OPTIONS_TAB_LEGEND)
        clickOptionsModalHideButton()

        // legend key is hidden
        expectLegendKeyToBeHidden()

        // series key displays the correct amount of items
        expectSeriesKeyToHaveSeriesKeyItems(2)
    })
    it.skip('Non-legend set type displays correctly: Line', () => {
        // navigates to the start page and adds data items
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_LINE])
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_LINE)

        // legend is not applied to Line
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToNotHaveLegendSet(item.name)
        )

        // legend options are not available
        openOptionsModal()
        expectOptionsTabToBeHidden(OPTIONS_TAB_LEGEND)

        // legend key is hidden
        expectLegendKeyToBeHidden()

        // series key displays the correct amount of items
        expectSeriesKeyToHaveSeriesKeyItems(2)
    })
    it.skip('The chart series key displaying legend colors', () => {
        // navigates to the start page and adds data items
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // series key displays the correct amount of items
        expectSeriesKeyToHaveSeriesKeyItems(2)

        // enables legend
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        clickOptionsModalUpdateButton()
        expectChartTitleToBeVisible()

        cy.log(
            `changes legend display strategy to fixed (${TEST_ITEMS[1].legendSet})`
        )
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()
        changeDisplayStrategyToFixed()
        expectLegendDisplayStrategyToBeFixed()
        changeFixedLegendSet(TEST_ITEMS[1].legendSet)
        clickOptionsModalUpdateButton()
        expectChartTitleToBeVisible()
    })
    it.skip('When data is not on series, legend is only applied when strategy fixed is used', () => {
        const TEST_ITEM = TEST_ITEMS[0]

        // navigates to the start page and adds data items, legend and legend key
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        // selects period 'Last 3 months'
        openDimension(DIMENSION_ID_PERIOD)
        unselectAllItemsByButton()
        selectRelativePeriods(['Last 3 months'], 'Months')
        clickDimensionModalUpdateButton()

        // legend by data item is applied
        expectWindowConfigSeriesItemToHaveLegendSet(
            TEST_ITEM.name,
            TEST_ITEM.legendSet
        )

        // legend key is shown with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        // series key displays the correct amount of items
        expectSeriesKeyToHaveSeriesKeyItems(1)

        // moves period dimension to series axis
        openContextMenu(DIMENSION_ID_PERIOD)
        clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_COLUMNS)
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible()
        expectAxisToHaveDimension(AXIS_ID_COLUMNS, DIMENSION_ID_PERIOD)

        // no legend is applied
        expectEachWindowConfigSeriesItemToNotHaveLegendSet()

        // legend key is hidden
        expectLegendKeyToBeHidden()

        cy.log(
            `change legend display strategy to fixed ${TEST_ITEMS[1].legendSet}`
        )
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()
        changeDisplayStrategyToFixed()
        expectLegendDisplayStrategyToBeFixed()
        changeFixedLegendSet(TEST_ITEMS[1].legendSet)
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        // fixed legend is applied
        expectEachWindowConfigSeriesItemToHaveLegendSet(TEST_ITEMS[1].legendSet)

        // legend key is shown with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        // series key displays the correct amount of items
        expectSeriesKeyToHaveSeriesKeyItems(3)
    })
    it.skip('Legend is not applied to column-as-line items', () => {
        // navigates to the start page and adds data items, legend and legend key
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        // legend by data item is applied
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToHaveLegendSet(
                item.name,
                item.legendSet
            )
        )

        cy.log(`changes all items to type ${VIS_TYPE_LINE}`)
        openOptionsModal(OPTIONS_TAB_SERIES)
        TEST_ITEMS.forEach((item, index) => setItemToType(index, VIS_TYPE_LINE))
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()
        TEST_ITEMS.forEach((item, index) =>
            expectWindowConfigSeriesItemToBeType(index, 'line')
        )

        // no legend is applied
        expectEachWindowConfigSeriesItemToNotHaveLegendSet()

        // legend key is hidden
        expectLegendKeyToBeHidden()

        // series key displays the correct amount of items
        expectSeriesKeyToHaveSeriesKeyItems(2)

        cy.log(
            `changes first item (${TEST_ITEMS[0].name}) to type ${VIS_TYPE_COLUMN}`
        )
        openOptionsModal(OPTIONS_TAB_SERIES)
        setItemToType(0, VIS_TYPE_COLUMN)
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()
        expectWindowConfigSeriesItemToNotHaveType(0)

        // legend by data item is applied to the first item
        expectWindowConfigSeriesItemToHaveLegendSet(
            TEST_ITEMS[0].name,
            TEST_ITEMS[0].legendSet
        )
        expectWindowConfigSeriesItemToNotHaveLegendSet(TEST_ITEMS[1].name)

        // legend key is shown with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        // series key displays the correct amount of items
        expectSeriesKeyToHaveSeriesKeyItems(2)

        const TEST_ITEM = {
            name: 'ANC 2 Coverage',
            legendSet: 'ANC Coverage',
            legends: 7,
        }

        cy.log(
            `adds a third item (${TEST_ITEM.name} - same legendset as the first item) with type ${VIS_TYPE_LINE}`
        )
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        openOptionsModal(OPTIONS_TAB_SERIES)
        setItemToType(2, VIS_TYPE_LINE)
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()
        expectWindowConfigSeriesItemToNotHaveType(0)

        // legend key is shown with 1 item
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        // legend by data item is applied to the first item
        expectWindowConfigSeriesItemToHaveLegendSet(
            TEST_ITEMS[0].name,
            TEST_ITEMS[0].legendSet
        )
        expectWindowConfigSeriesItemToNotHaveLegendSet(TEST_ITEMS[1].name)
        expectWindowConfigSeriesItemToNotHaveLegendSet(TEST_ITEM.name)

        // series key displays the correct amount of items
        expectSeriesKeyToHaveSeriesKeyItems(3)
    })
})
