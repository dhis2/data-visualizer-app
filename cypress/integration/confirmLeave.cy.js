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
