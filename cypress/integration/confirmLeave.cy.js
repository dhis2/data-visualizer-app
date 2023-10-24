import {
    expectAOTitleToBeDirty,
    expectAOTitleToNotBeDirty,
    expectVisualizationToBeVisible,
    expectVisualizationToNotBeVisible,
} from '../elements/chart.js'
import { replacePeriodItems } from '../elements/common.js'
import {
    confirmLeave,
    expectConfirmLeaveModalToBeVisible,
} from '../elements/confirmLeaveModal.js'
import { createNewAO, openAOByName } from '../elements/fileMenu/index.js'
import {
    expectStartScreenToBeVisible,
    goToStartPage,
} from '../elements/startScreen.js'
import { TEST_AOS } from '../utils/data.js'
import { getRandomArrayItem } from '../utils/random.js'

test('Confirm leave modal preserves AO changes when user cancels leave, and discards changes when user approves leave', () => {
    const TEST_AO = getRandomArrayItem(TEST_AOS)
    // navigates to the start page and loads a random saved AO
    goToStartPage()
    openAOByName(TEST_AO.name)
    expectVisualizationToBeVisible(TEST_AO.type)
    expectAOTitleToNotBeDirty()

    // replaces the selected period
    replacePeriodItems(TEST_AO.type)
    expectVisualizationToBeVisible(TEST_AO.type)
    expectAOTitleToBeDirty()

    // tries to open a new AO
    createNewAO()
    expectConfirmLeaveModalToBeVisible()

    // cancels leave
    confirmLeave(false)
    expectVisualizationToBeVisible(TEST_AO.type)
    expectAOTitleToBeDirty()

    // tries to open a new AO
    createNewAO()
    expectConfirmLeaveModalToBeVisible()

    // confirms leave
    confirmLeave(true)
    expectStartScreenToBeVisible()
    expectVisualizationToNotBeVisible()
    expectAOTitleToNotBeDirty()
})
