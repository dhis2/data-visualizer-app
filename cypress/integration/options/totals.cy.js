import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    VIS_TYPE_PIVOT_TABLE,
    visTypeDisplayNames,
} from '@dhis2/analytics'
import { checkCheckbox } from '../../elements/common.js'
import {
    clickDimensionModalHideButton,
    clickDimensionModalUpdateButton,
    expectDimensionModalToBeVisible,
    inputSearchTerm,
    selectAllItemsByButton,
    selectDataElements,
    selectDataItems,
    selectFixedPeriods,
    unselectAllItemsByButton,
} from '../../elements/dimensionModal/index.js'
import {
    clickContextMenuAdd,
    openContextMenu as openDimPanelContextMenu,
    openDimension,
} from '../../elements/dimensionsPanel.js'
import { clickContextMenuMove, openContextMenu } from '../../elements/layout.js'
import { openOptionsModal } from '../../elements/menuBar.js'
import {
    OPTIONS_TAB_DATA,
    clickOptionsModalHideButton,
} from '../../elements/optionsModal/index.js'
import {
    colTotalsOptionEl,
    expectColumnsTotalsToBeChecked,
} from '../../elements/optionsModal/totals.js'
import {
    expectTableToBeVisible,
    expectTableValueCellToContainValue,
} from '../../elements/pivotTable.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'
import { TEST_CUSTOM_DIMENSIONS } from '../../utils/data.js'

const AREA_DIMENSION = TEST_CUSTOM_DIMENSIONS.find((dim) => dim.name === 'Area')

describe('Options - Column totals', () => {
    describe('Regression test for DHIS2-17297', () => {
        it('does not crash', () => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])

            openOptionsModal(OPTIONS_TAB_DATA)
            checkCheckbox(colTotalsOptionEl)

            expectColumnsTotalsToBeChecked()

            clickOptionsModalHideButton()

            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuMove(DIMENSION_ID_DATA, AXIS_ID_ROWS)
            openContextMenu(DIMENSION_ID_PERIOD)
            clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_COLUMNS)

            openDimension(DIMENSION_ID_DATA)
            selectDataElements(['ART enrollment stage 1'])
            clickDimensionModalHideButton()

            const year = new Date().getFullYear().toString()
            openDimension(DIMENSION_ID_PERIOD)
            unselectAllItemsByButton()
            selectFixedPeriods(
                [`May ${year}`, `June ${year}`, `July ${year}`],
                'Monthly'
            )
            clickDimensionModalHideButton()

            openDimPanelContextMenu(AREA_DIMENSION.id)
            clickContextMenuAdd(AREA_DIMENSION.id, AXIS_ID_ROWS)
            expectDimensionModalToBeVisible(AREA_DIMENSION.id)
            selectAllItemsByButton()

            clickDimensionModalUpdateButton()

            expectTableToBeVisible()
        })
    })

    describe('Regression test for DHIS2-9155', () => {
        it('computes totals for boolean value types', () => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])

            openOptionsModal(OPTIONS_TAB_DATA)
            checkCheckbox(colTotalsOptionEl)

            expectColumnsTotalsToBeChecked()

            clickOptionsModalHideButton()

            openDimension(DIMENSION_ID_DATA)
            inputSearchTerm('yes')
            selectDataItems([
                'E2E program E2E - Yes only',
                'E2E program E2E - Yes/no',
            ])
            clickDimensionModalUpdateButton()

            expectTableToBeVisible()

            // XXX is there a better way to address the total value cells?
            expectTableValueCellToContainValue(12, 4)
            expectTableValueCellToContainValue(13, 4)
        })
    })
})
