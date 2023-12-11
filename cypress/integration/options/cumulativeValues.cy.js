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
import {
    clickDimensionModalHideButton,
    clickDimensionModalUpdateButton,
    selectDataElements,
    selectFixedPeriods,
    unselectAllItemsByButton,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { clickContextMenuMove, openContextMenu } from '../../elements/layout.js'
import { openOptionsModal } from '../../elements/menuBar.js'
import {
    OPTIONS_TAB_DATA,
    OPTIONS_TAB_LEGEND,
    clickOptionsModalHideButton,
    clickOptionsModalUpdateButton,
    clickOptionsTab,
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
import {
    expectTableValueCellToContainValue,
    clickTableHeaderCell,
} from '../../elements/pivotTable.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'
import { TEST_DATA_ELEMENTS } from '../../utils/data.js'

const cumulativeValuesOptionEl = 'option-cumulative-values'

describe('Options - Cumulative values', () => {
    describe('Interaction with other options (only for PT)', () => {
        beforeEach(() => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
        })

        it('disables/enables Totals, Number type and Legend options when cumulativeValues is checked/unchecked', () => {
            openOptionsModal(OPTIONS_TAB_DATA)
            checkCheckbox(cumulativeValuesOptionEl)

            // Totals
            expectColumnsTotalsToBeDisabled()
            expectColumnsSubTotalsToBeDisabled()
            expectRowsTotalsToBeDisabled()
            expectRowsSubTotalsToBeDisabled()

            // Number type
            cy.getBySel('option-number-type-select')
                .should('contain', 'Not supported when using cumulative values')
                .find('[data-test="dhis2-uicore-select-input"]')
                .should('have.class', 'disabled')

            // Legend
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            cy.getBySel('option-legend')
                .should('contain', 'Not supported when using cumulative values')
                .find('[type="checkbox"]')
                .should('be.disabled')

            clickOptionsTab(OPTIONS_TAB_DATA)
            uncheckCheckbox(cumulativeValuesOptionEl)

            // Totals
            expectColumnsTotalsToBeEnabled()
            expectColumnsSubTotalsToBeEnabled()
            expectRowsTotalsToBeEnabled()
            expectRowsSubTotalsToBeEnabled()

            // Number type
            cy.getBySel('option-number-type-select')
                .should(
                    'not.contain',
                    'Not supported when using cumulative values'
                )
                .find('[data-test="dhis2-uicore-select-input"]')
                .should('not.have.class', 'disabled')

            // Legend
            clickOptionsTab(OPTIONS_TAB_LEGEND)
            cy.getBySel('option-legend')
                .should(
                    'not.contain',
                    'Not supported when using cumulative values'
                )
                .find('[type="checkbox"]')
                .should('not.be.disabled')

            clickOptionsModalHideButton()
        })

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
        beforeEach(() => {
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
        })

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
            inputCalculationLabel('test data for cumulativeValues sorting')
            clickSaveButton()

            clickDimensionModalUpdateButton()

            openOptionsModal(OPTIONS_TAB_DATA)
            checkCheckbox(cumulativeValuesOptionEl)
            clickOptionsModalUpdateButton()

            Array.from({ length: 12 }, (_, i) => i).forEach((i) =>
                expectTableValueCellToContainValue(i, i + 1)
            )
        })

        it('correctly sort a column with cumulative values', () => {
            openContextMenu(DIMENSION_ID_DATA)
            clickContextMenuMove(DIMENSION_ID_DATA, AXIS_ID_ROWS)
            openContextMenu(DIMENSION_ID_PERIOD)
            clickContextMenuMove(DIMENSION_ID_PERIOD, AXIS_ID_COLUMNS)

            openDimension(DIMENSION_ID_PERIOD)
            unselectAllItemsByButton()
            selectFixedPeriods(
                ['October 2023', 'November 2023', 'December 2023'],
                'Monthly'
            )
            clickDimensionModalHideButton()

            // create a calculation to facilitate testing the cumulative values
            openDimension(DIMENSION_ID_DATA)
            clickNewCalculationButton()
            selectOperatorFromListByDoubleClick('Number')
            typeInNumberField(1, 6000)
            inputCalculationLabel('test data for sorting cumulative values')
            clickSaveButton()

            selectDataElements([TEST_DATA_ELEMENTS[4].name])

            clickDimensionModalUpdateButton()

            // sort before cumulative
            expectTableValueCellToContainValue(2, '6 000')
            expectTableValueCellToContainValue(5, '5 266')

            clickTableHeaderCell('December 2023')

            expectTableValueCellToContainValue(2, '5 266')
            expectTableValueCellToContainValue(5, '6 000')

            // sort after cumulative
            openOptionsModal(OPTIONS_TAB_DATA)
            checkCheckbox(cumulativeValuesOptionEl)
            clickOptionsModalUpdateButton()

            expectTableValueCellToContainValue(2, '18 000')
            expectTableValueCellToContainValue(5, '18 488')

            clickTableHeaderCell('December 2023')

            expectTableValueCellToContainValue(2, '18 000')
            expectTableValueCellToContainValue(5, '18 488')
        })
    })
})
