import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'
import { expectVisualizationToBeVisible } from '../../elements/chart.js'
import { expectAppToNotBeLoading } from '../../elements/common.js'
import {
    changeSelectionToAutomatic,
    changeSelectionToManual,
    clickDimensionModalAddToButton,
    clickDimensionModalUpdateButton,
    expectAutomaticSelectionToBeChecked,
    expectDimensionModalToBeVisible,
    expectItemToBeSelected,
    expectManualSelectionToBeChecked,
    selectDataElements,
    selectItemByButton,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { saveNewAO } from '../../elements/fileMenu/index.js'
import {
    expectDimensionToHaveAllItemsSelected,
    expectDimensionToHaveItemAmount,
} from '../../elements/layout.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { expectWindowConfigSeriesToHaveLength } from '../../utils/window.js'

const TEST_DYNAMIC_DIMENSION = {
    id: 'J5jldMd8OHv',
    name: 'Facility type',
    itemAmount: 5,
}

describe(`Dynamic dimension - ${TEST_DYNAMIC_DIMENSION.name}`, () => {
    it('can add and remove items, which persist after saving', () => {
        cy.log('navigates to the start page and adds a data item')
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectDataElements(['ANC 2nd visit'])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        const TEST_ITEM = 'Hospital'
        cy.log('adds an item manually')
        openDimension(TEST_DYNAMIC_DIMENSION.id)
        expectDimensionModalToBeVisible(TEST_DYNAMIC_DIMENSION.id)
        expectManualSelectionToBeChecked()
        selectItemByButton(TEST_ITEM)
        clickDimensionModalAddToButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(1)
        expectDimensionToHaveItemAmount(TEST_DYNAMIC_DIMENSION.id, 1)

        cy.log('adds all items automatically')
        openDimension(TEST_DYNAMIC_DIMENSION.id)
        expectDimensionModalToBeVisible(TEST_DYNAMIC_DIMENSION.id)
        expectManualSelectionToBeChecked()
        changeSelectionToAutomatic()
        expectAutomaticSelectionToBeChecked()
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(TEST_DYNAMIC_DIMENSION.itemAmount)
        expectDimensionToHaveAllItemsSelected(TEST_DYNAMIC_DIMENSION.id)

        cy.log('switches back to manual and previous item is persisted')
        openDimension(TEST_DYNAMIC_DIMENSION.id)
        expectDimensionModalToBeVisible(TEST_DYNAMIC_DIMENSION.id)
        expectAutomaticSelectionToBeChecked()
        changeSelectionToManual()
        expectManualSelectionToBeChecked()
        expectItemToBeSelected(TEST_ITEM)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(1)
        expectDimensionToHaveItemAmount(TEST_DYNAMIC_DIMENSION.id, 1)

        cy.log('switches back to automatic, saving, the selection is persisted')
        openDimension(TEST_DYNAMIC_DIMENSION.id)
        expectDimensionModalToBeVisible(TEST_DYNAMIC_DIMENSION.id)
        expectManualSelectionToBeChecked()
        changeSelectionToAutomatic()
        expectAutomaticSelectionToBeChecked()
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(TEST_DYNAMIC_DIMENSION.itemAmount)
        expectDimensionToHaveAllItemsSelected(TEST_DYNAMIC_DIMENSION.id)
        saveNewAO(
            `TEST DYNAMIC DIMENSION AUTOMATIC SELECTION ${new Date().toLocaleString()}`
        )
        expectAppToNotBeLoading()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        expectWindowConfigSeriesToHaveLength(TEST_DYNAMIC_DIMENSION.itemAmount)
        expectDimensionToHaveAllItemsSelected(TEST_DYNAMIC_DIMENSION.id)
    })
})
