import {
    expectAOTitleToBeDirty,
    expectAOTitleToNotBeDirty,
    expectVisualizationToBeVisible,
    expectVisualizationToNotBeVisible,
} from '../elements/chart'
import { replacePeriodItems } from '../elements/common'
import {
    confirmLeave,
    expectConfirmLeaveModalToBeVisible,
} from '../elements/confirmLeaveModal'
import { createNewAO, openAOByName } from '../elements/fileMenu'
import {
    expectStartScreenToBeVisible,
    goToStartPage,
} from '../elements/startScreen'
import { TEST_AOS } from '../utils/data'
import { getRandomArrayItem } from '../utils/random'

describe('confirm leave modal', () => {
    const TEST_AO = getRandomArrayItem(TEST_AOS)

    it('navigates to the start page and loads a random saved AO', () => {
        goToStartPage()
        openAOByName(TEST_AO.name)
        expectVisualizationToBeVisible(TEST_AO.type)
        expectAOTitleToNotBeDirty()
    })
    it(`replaces the selected period`, () => {
        replacePeriodItems(TEST_AO.type)
        expectVisualizationToBeVisible(TEST_AO.type)
        expectAOTitleToBeDirty()
    })
    it('tries to open a new AO', () => {
        createNewAO()
        expectConfirmLeaveModalToBeVisible()
    })
    it('cancels leave', () => {
        confirmLeave(false)
        expectVisualizationToBeVisible(TEST_AO.type)
        expectAOTitleToBeDirty()
    })
    it('tries to open a new AO', () => {
        createNewAO()
        expectConfirmLeaveModalToBeVisible()
    })
    it('confirms leave', () => {
        confirmLeave(true)
        expectStartScreenToBeVisible()
        expectVisualizationToNotBeVisible()
        expectAOTitleToNotBeDirty()
    })
})
