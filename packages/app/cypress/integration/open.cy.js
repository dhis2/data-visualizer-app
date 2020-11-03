import {
    openRandomSavedAO,
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
import { VIS_TYPE_COLUMN } from '@dhis2/analytics'

const AMOUNT_OF_INDICATORS_TO_ADD = 3

describe('open', () => {
    it.only('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()

        openRandomSavedAO()
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
        Open a random AO (regardless of creator)
        Check that visType matches that of the AO
            - Either grab it from the icon in the open dialog
            - or grab it from the server response
    */
})
