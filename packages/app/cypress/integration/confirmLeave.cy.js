import {
    expectChartTitleToBeDirty,
    expectVisualizationToBeVisible,
    expectChartTitleToNotBeDirty,
} from '../elements/Chart'
import { confirmLeave } from '../elements/ConfirmLeaveModal'
import { openRandomSavedAOCreatedByYou } from '../elements/FileMenu'

describe('open', () => {
    it('loads a random saved AO and cancel leave', () => {
        expectChartTitleToBeDirty()
        openRandomSavedAOCreatedByYou()
        confirmLeave(false)
        expectChartTitleToBeDirty()
        expectVisualizationToBeVisible() //TODO: Figure out which visType the first AO has and pass to fn
    })
    it('loads a random saved AO and confirm leave', () => {
        expectChartTitleToBeDirty()
        openRandomSavedAOCreatedByYou()
        confirmLeave(true)
        expectChartTitleToNotBeDirty()
        expectVisualizationToBeVisible() //TODO: Figure out which visType the second AO has and pass to fn
    })
})
