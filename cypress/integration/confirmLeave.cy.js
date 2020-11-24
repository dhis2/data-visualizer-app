import { isYearOverYear, DIMENSION_ID_PERIOD } from '@dhis2/analytics'

import {
    expectAOTitleToBeDirty,
    expectAOTitleToNotBeDirty,
    expectVisualizationToBeVisible,
    expectVisualizationToNotBeVisible,
} from '../elements/chart'
import {
    confirmLeave,
    expectConfirmLeaveModalToBeVisible,
} from '../elements/confirmLeaveModal'
import {
    clickDimensionModalUpdateButton,
    selectRelativePeriods,
} from '../elements/dimensionModal'
import { removeAllPeriodItems } from '../elements/dimensionModal/periodDimension'
import { openDimension } from '../elements/dimensionsPanel'
import { createNewAO, openAOByName } from '../elements/fileMenu'
import { selectYoyCategoryOption } from '../elements/layout'
import { clickMenuBarUpdateButton } from '../elements/menuBar'
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
        if (isYearOverYear(TEST_AO.type)) {
            const TEST_PERIOD = 'Last 2 six-months'
            selectYoyCategoryOption(TEST_PERIOD)
            clickMenuBarUpdateButton()
        } else {
            const TEST_PERIOD_TYPE = 'Six-months'
            const TEST_PERIOD = 'Last six-month'
            openDimension(DIMENSION_ID_PERIOD)
            removeAllPeriodItems()
            selectRelativePeriods([TEST_PERIOD], TEST_PERIOD_TYPE)
            clickDimensionModalUpdateButton()
        }
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
