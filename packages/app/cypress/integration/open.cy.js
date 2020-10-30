import {
    openRandomSavedAOCreatedByYou,
    openSavedAO,
} from '../elements/FileMenu'
import {
    expectChartTitleToBeDirty,
    expectChartTitleToBeValue,
    expectChartTitleToNotBeDirty,
    expectChartToBeVisible,
} from '../elements/Chart'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import {
    clickUpdate,
    selectRandomIndicators,
} from '../elements/DimensionsModal'
import { openDimension } from '../elements/DimensionsPanel'
import { confirmLeave } from '../elements/ConfirmLeaveModal'

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

        expectChartToBeVisible()
        expectChartTitleToNotBeDirty()
    })
    it(`adds ${AMOUNT_OF_INDICATORS_TO_ADD} indicators`, () => {
        const dimensionName = 'Data'

        openDimension(dimensionName)
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
        expectChartToBeVisible()
    })
    it('loads a random saved AO and confirm leave', () => {
        expectChartTitleToBeDirty()
        openRandomSavedAOCreatedByYou()
        confirmLeave(true)
        expectChartTitleToNotBeDirty()
        expectChartToBeVisible()
    })
})
