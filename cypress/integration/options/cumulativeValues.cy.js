import {
    AXIS_ID_COLUMNS,
    AXIS_ID_ROWS,
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    VIS_TYPE_PIVOT_TABLE,
    visTypeDisplayNames,
} from '@dhis2/analytics'
import {
    clickNewCalculationButton,
    clickSaveButton,
    inputCalculationLabel,
    selectOperatorFromListByDoubleClick,
    typeInNumberField,
} from '../../elements/calculationsModal.js'
import { checkCheckbox, uncheckCheckbox } from '../../elements/common.js'
import { clickDimensionModalUpdateButton } from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { clickContextMenuMove, openContextMenu } from '../../elements/layout.js'
import { openOptionsModal } from '../../elements/menuBar.js'
import {
    OPTIONS_TAB_DATA,
    clickOptionsModalHideButton,
    clickOptionsModalUpdateButton,
} from '../../elements/optionsModal/index.js'
import {
    colTotalsOptionEl,
    expectColumnsTotalsToBeChecked,
    expectColumnsTotalsToBeDisabled,
    expectColumnsSubTotalsToBeDisabled,
    expectRowsTotalsToBeDisabled,
    expectRowsSubTotalsToBeDisabled,
    expectColumnsTotalsToBeEnabled,
    expectColumnsSubTotalsToBeEnabled,
    expectRowsTotalsToBeEnabled,
    expectRowsSubTotalsToBeEnabled,
} from '../../elements/optionsModal/totals.js'
import { expectTableValueCellToContainValue } from '../../elements/pivotTable.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'

const cumulativeValuesOptionEl = 'option-cumulative-values'

describe('Options - Cumulative values', () => {
    describe('Interaction with other options (only for PT)', () => {
        beforeEach(() => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
            // TODO make a dimensions selection
        })

        it('disables/enables Totals and numberType options when cumulativeValues is checked/unchecked', () => {
            openOptionsModal(OPTIONS_TAB_DATA)
            checkCheckbox(cumulativeValuesOptionEl)

            expectColumnsTotalsToBeDisabled()
            expectColumnsSubTotalsToBeDisabled()
            expectRowsTotalsToBeDisabled()
            expectRowsSubTotalsToBeDisabled()

            uncheckCheckbox(cumulativeValuesOptionEl)

            expectColumnsTotalsToBeEnabled()
            expectColumnsSubTotalsToBeEnabled()
            expectRowsTotalsToBeEnabled()
            expectRowsSubTotalsToBeEnabled()

            clickOptionsModalHideButton()
        })

        // XXX this might need to change because currently the disabled options are still applied
        it('disables/enables a total option preserving its state', () => {
            openOptionsModal(OPTIONS_TAB_DATA)
            checkCheckbox(colTotalsOptionEl)

            expectColumnsTotalsToBeChecked()

            checkCheckbox(cumulativeValuesOptionEl)

            expectColumnsTotalsToBeDisabled()
            expectColumnsTotalsToBeChecked()

            uncheckCheckbox(cumulativeValuesOptionEl)

            expectColumnsTotalsToBeEnabled()
            expectColumnsTotalsToBeChecked()

            clickOptionsModalHideButton()
        })
    })

    describe('Applying cumulativeValues: Pivot table', () => {
        it('correctly shows the cumulative values', () => {
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuMove(DIMENSION_ID_DATA, AXIS_ID_ROWS)
            openContextMenu(DIMENSION_ID_PERIOD)
            clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_COLUMNS)

            // create a calculation to facilitate testing the cumulative values
            openDimension(DIMENSION_ID_DATA)
            clickNewCalculationButton()
            selectOperatorFromListByDoubleClick('Number')
            typeInNumberField(1, 1)
            inputCalculationLabel('test data for cumulativeValues')
            clickSaveButton()

            clickDimensionModalUpdateButton()

            openOptionsModal(OPTIONS_TAB_DATA)
            checkCheckbox(cumulativeValuesOptionEl)
            clickOptionsModalUpdateButton()

            Array.from({ length: 12 }, (_, i) => i).forEach((i) =>
                expectTableValueCellToContainValue(i, i + 1)
            )
        })
    })
})
