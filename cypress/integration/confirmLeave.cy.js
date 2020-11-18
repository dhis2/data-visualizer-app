import { DIMENSION_ID_DATA } from '@dhis2/analytics'

import {
    expectAOTitleToBeDirty,
    expectAOTitleToNotBeDirty,
    expectVisualizationToNotBeVisible,
} from '../elements/Chart'
import {
    confirmLeave,
    expectConfirmLeaveModalToBeVisible,
} from '../elements/ConfirmLeaveModal'
import {
    clickDimensionModalUpdateButton,
    removeAllDataItems,
    selectDataElements,
} from '../elements/DimensionModal'
import { expectNoDataItemsToBeSelected } from '../elements/DimensionModal/dataDimension'
import { openDimension } from '../elements/DimensionsPanel'
import { createNewAO, openRandomAO } from '../elements/FileMenu'
import {
    expectStartScreenToBeVisible,
    goToStartPage,
} from '../elements/StartScreen'
import { TEST_DATA_ELEMENTS } from '../utils/data'
import { getRandomArrayItem } from '../utils/random'

describe('confirm leave modal', () => {
    it('navigates to the start page and loads a random saved AO', () => {
        goToStartPage()
        openRandomAO()
        expectAOTitleToNotBeDirty()
    })
    it('replaces the data items', () => {
        openDimension(DIMENSION_ID_DATA)
        removeAllDataItems().then(() => expectNoDataItemsToBeSelected())
        selectDataElements([getRandomArrayItem(TEST_DATA_ELEMENTS).name])
        clickDimensionModalUpdateButton()
        expectAOTitleToBeDirty()
    })
    it('tries to open a new AO', () => {
        createNewAO()
        expectConfirmLeaveModalToBeVisible()
    })
    it('cancel leave', () => {
        confirmLeave(false)
        expectAOTitleToBeDirty()
    })
    it('tries to open a new AO', () => {
        createNewAO()
        expectConfirmLeaveModalToBeVisible()
    })
    it('confirm leave', () => {
        confirmLeave(true)
        expectAOTitleToNotBeDirty()
        expectVisualizationToNotBeVisible()
        expectStartScreenToBeVisible()
    })
})
