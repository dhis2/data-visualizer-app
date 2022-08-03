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
} from '@dhis2/analytics'
import {
    expectChartTitleToBeVisible,
    expectSeriesKeyToHaveSeriesKeyItems,
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
    clickMenuBarOptionsButton,
    clickMenuBarUpdateButton,
} from '../../elements/menuBar.js'
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
    expectOptionsTabToBeHidden,
    expectLegedKeyItemAmountToBe,
    OPTIONS_TAB_SERIES,
    setItemToType,
    clickOptionsModalHideButton,
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
    describe('Applying a legend: Column', () => {
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectIndicators(TEST_ITEMS.map((item) => item.name))
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
            TEST_ITEMS.forEach((item) =>
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
            TEST_ITEMS.forEach((item) =>
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
        it('legend key is shown with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
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
        it('legend key is shown with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
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
        it('legend key is shown with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
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
            cy.getBySel(valueCellEl).each(($el) => {
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
            cy.getBySel(valueCellEl).each(($el) => {
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
            cy.getBySel(valueCellEl).each(($el) => {
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
        it('legend key is shown with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
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
            cy.getBySel(valueCellEl).each(($el) => {
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
            selectIndicators(TEST_ITEMS.map((item) => item.name))
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
            TEST_ITEMS.forEach((item) =>
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
            selectIndicators(TEST_ITEMS.map((item) => item.name))
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
        it(`legend key is shown (Column) with ${TEST_ITEMS.length} items`, () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(TEST_ITEMS.length)
        })
        it('changes vis type to Pivot table', () => {
            changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        })
        it(`legend key is shown (Pivot table) with ${TEST_ITEMS.length} items`, () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(TEST_ITEMS.length)
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
        it('legend key is shown (Gauge) with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
        })
        it('changes vis type to Single value', () => {
            changeVisType(visTypeDisplayNames[VIS_TYPE_SINGLE_VALUE])
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        })
        it('legend key is shown (Single value) with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
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
    describe('Preventing options bleed: Column -> Stacked column', () => {
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectIndicators(TEST_ITEMS.map((item) => item.name))
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
            TEST_ITEMS.forEach((item) =>
                expectWindowConfigSeriesItemToHaveLegendSet(
                    item.name,
                    item.legendSet
                )
            )
        })
        it('changes vis type to Stacked column', () => {
            changeVisType(visTypeDisplayNames[VIS_TYPE_STACKED_COLUMN])
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_STACKED_COLUMN)
        })
        it('legend is not applied to Stacked column', () => {
            TEST_ITEMS.forEach((item) =>
                expectWindowConfigSeriesItemToNotHaveLegendSet(item.name)
            )
        })
        it('legend options are not available', () => {
            clickMenuBarOptionsButton()
            expectOptionsTabToBeHidden(OPTIONS_TAB_LEGEND)
            clickOptionsModalHideButton()
        })
        it('legend key is hidden', () => {
            expectLegendKeyToBeHidden()
        })
        it(`series key displays the correct amount of items`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(2)
        })
    })
    describe('Non-legend set type displays correctly: Line', () => {
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_LINE])
            openDimension(DIMENSION_ID_DATA)
            selectIndicators(TEST_ITEMS.map((item) => item.name))
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_LINE)
        })
        it('legend is not applied to Line', () => {
            TEST_ITEMS.forEach((item) =>
                expectWindowConfigSeriesItemToNotHaveLegendSet(item.name)
            )
        })
        it('legend options are not available', () => {
            clickMenuBarOptionsButton()
            expectOptionsTabToBeHidden(OPTIONS_TAB_LEGEND)
        })
        it('legend key is hidden', () => {
            expectLegendKeyToBeHidden()
        })
        it(`series key displays the correct amount of items`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(2)
        })
    })
    describe('The chart series key displaying legend colors', () => {
        it('navigates to the start page and adds data items', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectIndicators(TEST_ITEMS.map((item) => item.name))
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        })
        it(`series key displays the correct amount of items`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(2)
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
    })
    describe('When data is not on series, legend is only applied when strategy fixed is used', () => {
        const TEST_ITEM = TEST_ITEMS[0]
        it('navigates to the start page and adds data items, legend and legend key', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectIndicators([TEST_ITEM.name])
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeEnabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible()
        })
        it("selects period 'Last 3 months'", () => {
            openDimension(DIMENSION_ID_PERIOD)
            unselectAllItemsByButton()
            selectRelativePeriods(['Last 3 months'], 'Months')
            clickDimensionModalUpdateButton()
        })
        it('legend by data item is applied', () => {
            expectWindowConfigSeriesItemToHaveLegendSet(
                TEST_ITEM.name,
                TEST_ITEM.legendSet
            )
        })
        it('legend key is shown with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
        })
        it(`series key displays the correct amount of items`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(1)
        })
        it('moves period dimension to series axis', () => {
            openContextMenu(DIMENSION_ID_PERIOD)
            clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_COLUMNS)
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible()
            expectAxisToHaveDimension(AXIS_ID_COLUMNS, DIMENSION_ID_PERIOD)
        })
        it('no legend is applied', () => {
            expectEachWindowConfigSeriesItemToNotHaveLegendSet()
        })
        it('legend key is hidden', () => {
            expectLegendKeyToBeHidden()
        })
        it(`changes legend display strategy to fixed (${TEST_ITEMS[1].legendSet})`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            expectLegendDisplayStrategyToBeByDataItem()
            changeDisplayStrategyToFixed()
            expectLegendDisplayStrategyToBeFixed()
            changeFixedLegendSet(TEST_ITEMS[1].legendSet)
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible()
        })
        it('fixed legend is applied', () => {
            expectEachWindowConfigSeriesItemToHaveLegendSet(
                TEST_ITEMS[1].legendSet
            )
        })
        it('legend key is shown with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
        })
        it(`series key displays the correct amount of items`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(3)
        })
    })
    describe('Legend is not applied to column-as-line items', () => {
        it('navigates to the start page and adds data items, legend and legend key', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectIndicators(TEST_ITEMS.map((item) => item.name))
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            toggleLegend()
            expectLegendToBeEnabled()
            expectLegendDisplayStrategyToBeByDataItem()
            toggleLegendKeyOption()
            expectLegendKeyOptionToBeEnabled()
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible()
        })
        it('legend by data item is applied', () => {
            TEST_ITEMS.forEach((item) =>
                expectWindowConfigSeriesItemToHaveLegendSet(
                    item.name,
                    item.legendSet
                )
            )
        })
        it(`changes all items to type ${VIS_TYPE_LINE}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_SERIES)
            TEST_ITEMS.forEach((item, index) =>
                setItemToType(index, VIS_TYPE_LINE)
            )
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible()
            TEST_ITEMS.forEach((item, index) =>
                expectWindowConfigSeriesItemToBeType(index, 'line')
            )
        })
        it('no legend is applied', () => {
            expectEachWindowConfigSeriesItemToNotHaveLegendSet()
        })
        it('legend key is hidden', () => {
            expectLegendKeyToBeHidden()
        })
        it(`series key displays the correct amount of items`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(2)
        })
        it(`changes first item (${TEST_ITEMS[0].name}) to type ${VIS_TYPE_COLUMN}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_SERIES)
            setItemToType(0, VIS_TYPE_COLUMN)
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible()
            expectWindowConfigSeriesItemToNotHaveType(0)
        })
        it('legend by data item is applied to the first item', () => {
            expectWindowConfigSeriesItemToHaveLegendSet(
                TEST_ITEMS[0].name,
                TEST_ITEMS[0].legendSet
            )
            expectWindowConfigSeriesItemToNotHaveLegendSet(TEST_ITEMS[1].name)
        })
        it('legend key is shown with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
        })
        it(`series key displays the correct amount of items`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(2)
        })
        const TEST_ITEM = {
            name: 'ANC 2 Coverage',
            legendSet: 'ANC Coverage',
            legends: 7,
        }
        it(`adds a third item (${TEST_ITEM.name} - same legendset as the first item) with type ${VIS_TYPE_LINE}`, () => {
            openDimension(DIMENSION_ID_DATA)
            selectIndicators([TEST_ITEM.name])
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_SERIES)
            setItemToType(2, VIS_TYPE_LINE)
            clickOptionsModalUpdateButton()
            expectVisualizationToBeVisible()
            expectWindowConfigSeriesItemToNotHaveType(0)
        })
        it('legend key is shown with 1 item', () => {
            expectLegendKeyToBeVisible()
            expectLegedKeyItemAmountToBe(1)
        })
        it('legend by data item is applied to the first item', () => {
            expectWindowConfigSeriesItemToHaveLegendSet(
                TEST_ITEMS[0].name,
                TEST_ITEMS[0].legendSet
            )
            expectWindowConfigSeriesItemToNotHaveLegendSet(TEST_ITEMS[1].name)
            expectWindowConfigSeriesItemToNotHaveLegendSet(TEST_ITEM.name)
        })
        it(`series key displays the correct amount of items`, () => {
            expectSeriesKeyToHaveSeriesKeyItems(3)
        })
    })
})
