import { DIMENSION_ID_DATA } from '@dhis2/analytics'
import {
    expectChartTitleToBeDirty,
    expectChartTitleToNotBeDirty,
    expectVisualizationToNotBeVisible,
} from '../elements/Chart'
import {
    confirmLeave,
    expectConfirmLeaveModalToBeVisible,
} from '../elements/ConfirmLeaveModal'
import {
    clickModalUpdateButton,
    removeAllDataItems,
    selectDataElements,
} from '../elements/DimensionModal'
import { openDimension } from '../elements/DimensionsPanel'
import { createNewAO, openRandomSavedAO } from '../elements/FileMenu'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import { TEST_DATA_ELEMENTS } from '../utils/data'

describe('confirm leave', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    it('loads a random saved AO', () => {
        openRandomSavedAO()
        expectChartTitleToNotBeDirty()
    })
    it('replaces the data items', () => {
        openDimension(DIMENSION_ID_DATA)
        removeAllDataItems()
        selectDataElements([TEST_DATA_ELEMENTS[0].name])
        clickModalUpdateButton()
        expectChartTitleToBeDirty()
    })
    it('tries to open a new AO', () => {
        createNewAO()
        expectConfirmLeaveModalToBeVisible()
    })
    it('cancel leave', () => {
        confirmLeave(false)
        expectChartTitleToBeDirty()
    })
    it('tries to open a new AO', () => {
        createNewAO()
        expectConfirmLeaveModalToBeVisible()
    })
    it('confirm leave', () => {
        confirmLeave(true)
        expectChartTitleToNotBeDirty()
        expectVisualizationToNotBeVisible()
        expectStartScreenToBeVisible()
    })
})
