import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_GAUGE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_STACKED_COLUMN,
    VIS_TYPE_LINE,
    DIMENSION_ID_PERIOD,
    AXIS_ID_COLUMNS,
    VIS_TYPE_AREA,
    AXIS_ID_ROWS,
    getDisplayNameByVisType,
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
    it('applies different styles of legend to a Column chart', () => {
        cy.log('navigates to the start page and add data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_COLUMN))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        cy.log('enables legend')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        clickOptionsModalUpdateButton()
        expectChartTitleToBeVisible()

        cy.log('verifies legend by data item is applied')
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

        cy.log('verifies fixed legend is applied')
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToHaveLegendSet(
                item.name,
                TEST_LEGEND_SET
            )
        )

        cy.log('verifies legend key is hidden')
        expectLegendKeyToBeHidden()

        cy.log('verifies that options are persisted')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectFixedLegendSetToBe(TEST_LEGEND_SET)

        cy.log('enables legend key option')
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        cy.log('verifies legend key is shown with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)
    })

    it('applies different styles of legend to a Single Value chart', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = '#212934'
        const EXPECTED_CONTRAST_TEXT_COLOR = '#ffffff'
        const EXPECTED_CONTRAST_TEXT_COLOR_RGB = 'rgb(255, 255, 255)'
        const EXPECTED_BACKGROUND_COLOR_1 = '#FFFFB2'
        const EXPECTED_TEXT_COLOR_1 = '#FFFFB2'
        const EXPECTED_BACKGROUND_COLOR_2 = '#B3402B'
        const EXPECTED_TEXT_COLOR_2 = '#B3402B'
        const EXPECTED_CUSTOM_TITLE_COLOR = '#ff7700'
        const EXPECTED_CUSTOM_TITLE_COLOR_RGB = 'rgb(255, 119, 0)'
        const EXPECTED_CUSTOM_SUBTITLE_COLOR = '#ffaa00'
        const EXPECTED_CUSTOM_SUBTITLE_COLOR_RGB = 'rgb(255, 170, 0)'
        const TEST_LEGEND_SET_WITH_CONTRAST = 'Age 15y interval'
        const EXPECTED_STANDARD_TITLE_COLOR = 'rgb(33, 41, 52)'
        const EXPECTED_STANDARD_SUBTITLE_COLOR = 'rgb(74, 87, 104)'

        cy.log('navigates to the start page and adds data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_SINGLE_VALUE))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        expectSingleValueToHaveTextColor(EXPECTED_STANDARD_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor('transparent')

        cy.log('enables legend')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on background, no contrast, no custom title colors
        cy.log('verifies background color legend is applied')
        expectSingleValueToHaveTextColor(EXPECTED_STANDARD_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_1)
        expectSVTitleToHaveColor(EXPECTED_STANDARD_TITLE_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_STANDARD_SUBTITLE_COLOR)

        cy.log('changes legend display style to text color')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        changeDisplayStyleToText()
        expectLegendDisplayStyleToBeText()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on text, no contrast, no custom title colors
        cy.log('verifies text color legend is applied')
        expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_1)
        expectSingleValueToHaveBackgroundColor('transparent')
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
        cy.log('verifies text color legend is applied')
        expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_2)
        expectSingleValueToHaveBackgroundColor('transparent')
        expectSVTitleToHaveColor(EXPECTED_STANDARD_TITLE_COLOR)
        expectSVSubtitleToHaveColor(EXPECTED_STANDARD_SUBTITLE_COLOR)

        cy.log('changes legend display style to background color')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectLegendDisplayStyleToBeText()
        changeDisplayStyleToFill()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on background, with contrast, no custom title colors
        cy.log(
            'verifies background color legend and contrast text color is applied'
        )
        expectSingleValueToHaveTextColor(EXPECTED_CONTRAST_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_2)
        expectSVTitleToHaveColor(EXPECTED_CONTRAST_TEXT_COLOR_RGB)
        expectSVSubtitleToHaveColor(EXPECTED_CONTRAST_TEXT_COLOR_RGB)

        cy.log('changes title and subtitle colors')
        openOptionsModal(OPTIONS_TAB_STYLE)
        changeColor('option-chart-title', EXPECTED_CUSTOM_TITLE_COLOR)
        changeColor('option-chart-subtitle', EXPECTED_CUSTOM_SUBTITLE_COLOR)
        clickOptionsModalUpdateButton()

        // Legend on background, with contrast, with custom title colo
        cy.log(
            'verifies background color legend, contrast text color and custom title colors are applied'
        )
        expectSingleValueToHaveTextColor(EXPECTED_CONTRAST_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_2)
        expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR_RGB)
        expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR_RGB)

        cy.log('changes legend display style to text color')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectLegendDisplayStyleToBeFill()
        changeDisplayStyleToText()
        expectLegendDisplayStyleToBeText()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on text, with contrast, with custom title colors
        cy.log('verifies text color legend and custom title colors are applied')
        expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_2)
        expectSingleValueToHaveBackgroundColor('transparent')
        expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR_RGB)
        expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR_RGB)

        cy.log('changes legend display strategy to by data item')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStyleToBeText()
        expectLegendDisplayStrategyToBeFixed()
        changeDisplayStrategyToByDataItem()
        expectLegendDisplayStrategyToBeByDataItem()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on text, no contrast, with custom title colors
        cy.log('verifies text color legend and custom title colors are applied')
        expectSingleValueToHaveTextColor(EXPECTED_TEXT_COLOR_1)
        expectSingleValueToHaveBackgroundColor('transparent')
        expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR_RGB)
        expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR_RGB)

        cy.log('changes legend display style to background color')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        changeDisplayStrategyToByDataItem()
        expectLegendDisplayStyleToBeText()
        changeDisplayStyleToFill()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        // Legend on background, no contrast, with custom title colors
        cy.log(
            'verifies background color legend and custom title colors are applied'
        )
        expectSingleValueToHaveTextColor(EXPECTED_STANDARD_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_BACKGROUND_COLOR_1)
        expectSVTitleToHaveColor(EXPECTED_CUSTOM_TITLE_COLOR_RGB)
        expectSVSubtitleToHaveColor(EXPECTED_CUSTOM_SUBTITLE_COLOR_RGB)

        cy.log('verifies legend key is hidden')
        expectLegendKeyToBeHidden()

        cy.log('enables legend key option')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        cy.log('verifies legend key is shown with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)
    })

    it('applies different styles of legend to a Gauge chart', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_BY_DATA_COLOR = '#FFFFB2'
        const EXPECTED_FIXED_COLOR = '#c7e9c0'

        cy.log('navigates to the start page and adds data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_GAUGE))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        cy.log('enables legend')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        cy.log('legend by data item is applied')
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

        cy.log('fixed legend is applied')
        expectWindowConfigYAxisToHaveColor(EXPECTED_FIXED_COLOR)

        cy.log('changes legend display style to text color')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectFixedLegendSetToBe(TEST_LEGEND_SET)
        expectLegendDisplayStyleToBeFill()
        changeDisplayStyleToText()
        expectLegendDisplayStyleToBeText()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        cy.log('legend style is applied')
        expectWindowConfigSeriesDataLabelsToHaveColor(0, EXPECTED_FIXED_COLOR)

        cy.log('legend key is hidden')
        expectLegendKeyToBeHidden()

        cy.log('verifies that options are persisted')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectFixedLegendSetToBe(TEST_LEGEND_SET)

        cy.log('enables legend key option')
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        cy.log('legend key is shown with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)
    })

    it('applies different styles of legend to a Stacked Column chart', () => {
        cy.log('navigates to the start page and adds data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_STACKED_COLUMN))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_STACKED_COLUMN)

        cy.log('enables legend')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        clickOptionsModalUpdateButton()
        expectChartTitleToBeVisible()

        cy.log('legend by data item is applied')
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

        cy.log('fixed legend is applied')
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToHaveLegendSet(
                item.name,
                TEST_LEGEND_SET
            )
        )

        cy.log('legend key is hidden')
        expectLegendKeyToBeHidden()

        cy.log('verifies that options are persisted')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeFixed()
        expectFixedLegendSetToBe(TEST_LEGEND_SET)

        cy.log('enables legend key option')
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        cy.log('legend key is shown with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)
    })

    it('applies different styles of legend to a Pivot table', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = 'color: rgb(33, 41, 52)'
        const valueCellEl = 'visualization-value-cell'

        cy.log('navigates to the start page and adds data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_PIVOT_TABLE))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log('no legend is applied')
        cy.getBySel(valueCellEl).each(($el) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .should('not.contain', 'color')
                .and('not.contain', 'background-color')
        })

        cy.log('enables legend')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log('background color legend is applied')
        cy.getBySel(valueCellEl).each(($el) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .should('contain', 'background-color')
                .and('contain', EXPECTED_STANDARD_TEXT_COLOR)
        })

        cy.log('changes legend display style to text color')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()
        expectLegendDisplayStyleToBeFill()
        changeDisplayStyleToText()
        expectLegendDisplayStyleToBeText()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log('text color legend is applied')
        cy.getBySel(valueCellEl).each(($el) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .should('not.contain', 'background-color')
                .and('not.contain', EXPECTED_STANDARD_TEXT_COLOR)
        })

        cy.log('legend key is hidden')
        expectLegendKeyToBeHidden()

        cy.log('verifies that options are persisted')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStrategyToBeByDataItem()

        cy.log('enables legend key option')
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log('legend key is shown with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        // legend is applied when data is in rows
        cy.log('swap data and period')
        openContextMenu(DIMENSION_ID_PERIOD)
        clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_COLUMNS)
        openContextMenu(DIMENSION_ID_DATA)
        clickContextMenuMove(DIMENSION_ID_DATA, AXIS_ID_ROWS)
        clickMenuBarUpdateButton()

        cy.log('expect legend to still be applied')
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

    it('applies the legend when vis type is changed from Pivot table to Gauge', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_STANDARD_TEXT_COLOR = 'color: rgb(33, 41, 52)'
        const EXPECTED_FIXED_COLOR = '#c7e9c0'
        const valueCellEl = 'visualization-value-cell'

        cy.log(
            'navigates to the start page and adds data items and create Pivot'
        )
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_PIVOT_TABLE))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log('enables legend')
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

        cy.log('changes vis type to Gauge')
        changeVisType(getDisplayNameByVisType(VIS_TYPE_GAUGE))
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        cy.log(`text color fixed legend (${TEST_LEGEND_SET}) is applied`)
        expectWindowConfigSeriesDataLabelsToHaveColor(0, EXPECTED_FIXED_COLOR)

        cy.log('verifies that options are persisted')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStyleToBeText()
        expectLegendDisplayStrategyToBeFixed()
    })
    it('applies the legend when vis type is changed from Pivot table to Single value', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        const EXPECTED_FIXED_COLOR = '#c7e9c0'
        const valueCellEl = 'visualization-value-cell'
        const EXPECTED_SV_STANDARD_TEXT_COLOR = '#212934'
        const EXPECTED_PT_STANDARD_TEXT_COLOR = 'color: rgb(33, 41, 52)'

        cy.log('navigates to the start page and adds data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_PIVOT_TABLE))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log('enables legend')
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

        cy.log('changes vis type to Single value')
        changeVisType(getDisplayNameByVisType(VIS_TYPE_SINGLE_VALUE))
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        cy.log('legend is applied to Single value')
        expectSingleValueToHaveTextColor(EXPECTED_SV_STANDARD_TEXT_COLOR)
        expectSingleValueToHaveBackgroundColor(EXPECTED_FIXED_COLOR)

        cy.log('verifies that options are persisted')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        expectLegendDisplayStyleToBeFill()
        expectLegendDisplayStrategyToBeFixed()
    })

    it('applies the legend key settings when vis type changes: Column -> Pivot table -> Gauge -> Single value', () => {
        cy.log('navigates to the start page and adds data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_COLUMN))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible()

        cy.log('enables legend (Column)')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        cy.log('legend key is hidden (Column)')
        expectLegendKeyToBeHidden()

        cy.log('enables legend key option (Column)')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()

        cy.log(`legend key is shown (Column) with ${TEST_ITEMS.length} items`)
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(TEST_ITEMS.length)

        cy.log('changes vis type to Pivot table')
        changeVisType(getDisplayNameByVisType(VIS_TYPE_PIVOT_TABLE))
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log(
            `legend key is shown (Pivot table) with ${TEST_ITEMS.length} items`
        )
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(TEST_ITEMS.length)

        cy.log('disables legend key option (Pivot table)')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeDisabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        cy.log('legend key is hidden (Pivot table)')
        expectLegendKeyToBeHidden()

        cy.log('changes vis type to Gauge')
        changeVisType(getDisplayNameByVisType(VIS_TYPE_GAUGE))
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        cy.log('legend key is hidden (Gauge)')
        expectLegendKeyToBeHidden()

        cy.log('enables legend key option (Gauge)')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeEnabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_GAUGE)

        cy.log('legend key is shown (Gauge) with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        cy.log('changes vis type to Single value')
        changeVisType(getDisplayNameByVisType(VIS_TYPE_SINGLE_VALUE))
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        cy.log('legend key is shown (Single value) with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        cy.log('disables legend key option (Single value)')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegendKeyOption()
        expectLegendKeyOptionToBeDisabled()
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)

        cy.log('legend key is hidden (Single value)')
        expectLegendKeyToBeHidden()
    })
    it('does not apply non-applicable options when Column switched to Area', () => {
        cy.log('navigates to the start page and adds data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_COLUMN))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        cy.log('enables legend')
        openOptionsModal(OPTIONS_TAB_LEGEND)
        toggleLegend()
        expectLegendToBeEnabled()
        expectLegendDisplayStrategyToBeByDataItem()
        clickOptionsModalUpdateButton()
        expectChartTitleToBeVisible()

        cy.log('legend is applied to Column')
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToHaveLegendSet(
                item.name,
                item.legendSet
            )
        )

        cy.log('changes vis type to Area')
        changeVisType(getDisplayNameByVisType(VIS_TYPE_AREA))
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_AREA)

        cy.log('legend is not applied to Area')
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToNotHaveLegendSet(item.name)
        )

        cy.log('legend options are not available')
        openOptionsModal()
        expectOptionsTabToBeHidden(OPTIONS_TAB_LEGEND)
        clickOptionsModalHideButton()

        cy.log('legend key is hidden')
        expectLegendKeyToBeHidden()

        cy.log('series key displays the correct amount of items')
        expectSeriesKeyToHaveSeriesKeyItems(2)
    })
    it('does not enable legend options for Line chart', () => {
        cy.log('navigates to the start page and adds data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_LINE))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_LINE)

        cy.log('legend is not applied to Line')
        TEST_ITEMS.forEach((item) =>
            expectWindowConfigSeriesItemToNotHaveLegendSet(item.name)
        )

        cy.log('legend options are not available')
        openOptionsModal()
        expectOptionsTabToBeHidden(OPTIONS_TAB_LEGEND)

        cy.log('legend key is hidden')
        expectLegendKeyToBeHidden()

        cy.log('series key displays the correct number of items')
        expectSeriesKeyToHaveSeriesKeyItems(2)
    })
    it('changes legend from per data item to fixed strategy for Column chart', () => {
        cy.log('navigates to the start page and adds data items')
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_COLUMN))
        openDimension(DIMENSION_ID_DATA)
        selectIndicators(TEST_ITEMS.map((item) => item.name))
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        cy.log('series key displays the correct number of items')
        expectSeriesKeyToHaveSeriesKeyItems(2)

        cy.log('enables legend')
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
    it('only applies legend for charts where data is not on series when legend display strategy is fixed', () => {
        const TEST_ITEM = TEST_ITEMS[0]

        cy.log(
            'navigates to the start page and adds data items, legend and legend key'
        )
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_COLUMN))
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

        cy.log('selects period "Last 3 months"')
        openDimension(DIMENSION_ID_PERIOD)
        unselectAllItemsByButton()
        selectRelativePeriods(['Last 3 months'], 'Months')
        clickDimensionModalUpdateButton()

        cy.log('legend by data item is applied')
        expectWindowConfigSeriesItemToHaveLegendSet(
            TEST_ITEM.name,
            TEST_ITEM.legendSet
        )

        cy.log('legend key is shown with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        cy.log('series key displays the correct amount of items')
        expectSeriesKeyToHaveSeriesKeyItems(1)

        cy.log('moves period dimension to series axis')
        openContextMenu(DIMENSION_ID_PERIOD)
        clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_COLUMNS)
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible()
        expectAxisToHaveDimension(AXIS_ID_COLUMNS, DIMENSION_ID_PERIOD)

        cy.log('no legend is applied')
        expectEachWindowConfigSeriesItemToNotHaveLegendSet()

        cy.log('legend key is hidden')
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

        cy.log('fixed legend is applied')
        expectEachWindowConfigSeriesItemToHaveLegendSet(TEST_ITEMS[1].legendSet)

        cy.log('legend key is shown with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        cy.log('series key displays the correct amount of items')
        expectSeriesKeyToHaveSeriesKeyItems(3)
    })
    it('does not apply a legend to column-as-line items', () => {
        cy.log(
            'navigates to the start page and adds data items, legend and legend key'
        )
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_COLUMN))
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

        cy.log('legend by data item is applied')
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

        cy.log('no legend is applied')
        expectEachWindowConfigSeriesItemToNotHaveLegendSet()

        cy.log('legend key is hidden')
        expectLegendKeyToBeHidden()

        cy.log('series key displays the correct amount of items')
        expectSeriesKeyToHaveSeriesKeyItems(2)

        cy.log(
            `changes first item (${TEST_ITEMS[0].name}) to type ${VIS_TYPE_COLUMN}`
        )
        openOptionsModal(OPTIONS_TAB_SERIES)
        setItemToType(0, VIS_TYPE_COLUMN)
        clickOptionsModalUpdateButton()
        expectVisualizationToBeVisible()
        expectWindowConfigSeriesItemToNotHaveType(0)

        cy.log('legend by data item is applied to the first item')
        expectWindowConfigSeriesItemToHaveLegendSet(
            TEST_ITEMS[0].name,
            TEST_ITEMS[0].legendSet
        )
        expectWindowConfigSeriesItemToNotHaveLegendSet(TEST_ITEMS[1].name)

        cy.log('legend key is shown with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        cy.log('series key displays the correct amount of items')
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

        cy.log('legend key is shown with 1 item')
        expectLegendKeyToBeVisible()
        expectLegedKeyItemAmountToBe(1)

        cy.log('legend by data item is applied to the first item')
        expectWindowConfigSeriesItemToHaveLegendSet(
            TEST_ITEMS[0].name,
            TEST_ITEMS[0].legendSet
        )
        expectWindowConfigSeriesItemToNotHaveLegendSet(TEST_ITEMS[1].name)
        expectWindowConfigSeriesItemToNotHaveLegendSet(TEST_ITEM.name)

        cy.log('series key displays the correct amount of items')
        expectSeriesKeyToHaveSeriesKeyItems(3)
    })
})
