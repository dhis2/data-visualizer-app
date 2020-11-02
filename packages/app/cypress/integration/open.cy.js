import {
    openRandomSavedAOCreatedByYou,
    openSavedAO,
} from '../elements/FileMenu'
import {
    expectChartTitleToBeDirty,
    expectChartTitleToBeValue,
    expectChartTitleToNotBeDirty,
    expectVisualizationToBeVisible,
} from '../elements/Chart'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import {
    clickUpdate,
    selectRandomIndicators,
} from '../elements/DimensionsModal'
import { openDimension } from '../elements/DimensionsPanel'
import { confirmLeave } from '../elements/ConfirmLeaveModal'
import { VIS_TYPE_COLUMN } from '@dhis2/analytics'

const AMOUNT_OF_INDICATORS_TO_ADD = 3

describe('open', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    it('loads a saved AO', () => {
        const AOName = 'ANC: 1-3 dropout rate Yearly'

        openSavedAO(AOName)

        expectChartTitleToBeValue(AOName)

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN) //TODO: Figure out which visType the AO has and pass to fn
        expectChartTitleToNotBeDirty()
    })
    it(`adds ${AMOUNT_OF_INDICATORS_TO_ADD} indicators`, () => {
        const dimensionId = 'dx'

        openDimension(dimensionId)
        selectRandomIndicators(AMOUNT_OF_INDICATORS_TO_ADD)
        clickUpdate()
        expectChartTitleToBeDirty()
    })
    /*  TODO: 
        Check that new Data dims shows up in legend
        Check that AO name is "Edited"
        Change vis type
        Save
        Check that name is not "Edited"

        Run this test twice,
        1) AO "Created by you", can save
        2) AO "Created by others", can't save 
    */
    it('loads a random saved AO and cancel leave', () => {
        expectChartTitleToBeDirty()
        openRandomSavedAOCreatedByYou()
        confirmLeave(false)
        expectChartTitleToBeDirty()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN) //TODO: Figure out which visType the previous AO has and pass to fn
    })
    it('loads a random saved AO and confirm leave', () => {
        expectChartTitleToBeDirty()
        openRandomSavedAOCreatedByYou()
        confirmLeave(true)
        expectChartTitleToNotBeDirty()
        expectVisualizationToBeVisible() //TODO: Figure out which visType the new AO has and pass to fn
    })
})
