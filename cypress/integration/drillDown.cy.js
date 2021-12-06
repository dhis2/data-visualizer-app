import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    DIMENSION_ID_PERIOD,
    DIMENSION_ID_ORGUNIT,
    AXIS_ID_FILTERS,
    AXIS_ID_ROWS,
    visTypeDisplayNames,
    VIS_TYPE_PIVOT_TABLE,
} from '@dhis2/analytics'
import {
    clickChartItem,
    expectChartItemsToHaveLength,
    expectVisualizationToBeVisible,
} from '../elements/chart.js'
import {
    clickDimensionModalUpdateButton,
    selectIndicators,
} from '../elements/dimensionModal/index.js'
import {
    clickChangeOrgUnit,
    drillDown,
    drillUp,
    expectDrillDownMenuToBeVisible,
    expectDrillDownMenuToNotBeVisible,
} from '../elements/drillDownMenu.js'
import {
    clickContextMenuMove,
    expectAxisToHaveDimension,
    expectDimensionToHaveItemAmount,
    openContextMenu,
    openDimension,
} from '../elements/layout.js'
import { clickMenuBarUpdateButton } from '../elements/menuBar.js'
import {
    clickTableValueCell,
    expectTableValueCellsToHaveLength,
} from '../elements/pivotTable.js'
import { goToStartPage } from '../elements/startScreen.js'
import { changeVisType } from '../elements/visualizationTypeSelector.js'
import { TEST_INDICATORS } from '../utils/data.js'

describe('Drill-down: Column', () => {
    it('navigates to the start page and adds a data item', () => {
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_INDICATORS[2].name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
    })
    it('no context menu is opened when org unit is in filter', () => {
        clickChartItem(0)
        expectDrillDownMenuToNotBeVisible()
    })
    it('swaps org unit and period dimensions', () => {
        openContextMenu(DIMENSION_ID_PERIOD)
        clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_FILTERS)
        openContextMenu(DIMENSION_ID_ORGUNIT)
        clickContextMenuMove(DIMENSION_ID_ORGUNIT, AXIS_ID_ROWS)
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible()
        expectAxisToHaveDimension(AXIS_ID_FILTERS, DIMENSION_ID_PERIOD)
        expectAxisToHaveDimension(AXIS_ID_ROWS, DIMENSION_ID_ORGUNIT)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
    })
    it('context menu is opened when org unit is in category', () => {
        clickChartItem(0)
        expectDrillDownMenuToBeVisible()
    })
    it('drills down one level', () => {
        clickChangeOrgUnit()
        drillDown('District level in Sierra Leone')
        expectVisualizationToBeVisible()
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 2)
        expectChartItemsToHaveLength(13)
    })
    it('drills up one level', () => {
        clickChartItem(0)
        clickChangeOrgUnit()
        drillUp('Sierra Leone')
        expectVisualizationToBeVisible()
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
        expectChartItemsToHaveLength(1)
    })
})

describe('Drill-down: Pivot table', () => {
    it('navigates to the start page, changes vis type to Pivot table and adds a data item', () => {
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
        clickMenuBarUpdateButton()
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_INDICATORS[2].name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
    })
    it('no context menu is opened when org unit is in filter', () => {
        clickTableValueCell(0)
        expectDrillDownMenuToNotBeVisible()
    })
    it('swaps org unit and period dimensions', () => {
        openContextMenu(DIMENSION_ID_PERIOD)
        clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_FILTERS)
        openContextMenu(DIMENSION_ID_ORGUNIT)
        clickContextMenuMove(DIMENSION_ID_ORGUNIT, AXIS_ID_ROWS)
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        expectAxisToHaveDimension(AXIS_ID_FILTERS, DIMENSION_ID_PERIOD)
        expectAxisToHaveDimension(AXIS_ID_ROWS, DIMENSION_ID_ORGUNIT)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
    })
    it('context menu is opened when org unit is in category', () => {
        clickTableValueCell(0)
        expectDrillDownMenuToBeVisible()
    })
    it('drills down one level', () => {
        clickChangeOrgUnit()
        drillDown('District level in Sierra Leone')
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 2)
        expectTableValueCellsToHaveLength(13)
    })
    it('drills up one level', () => {
        clickTableValueCell(0)
        clickChangeOrgUnit()
        drillUp('Sierra Leone')
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        expectDimensionToHaveItemAmount(DIMENSION_ID_ORGUNIT, 1)
        expectTableValueCellsToHaveLength(1)
    })
})
