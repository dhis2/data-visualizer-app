import {
    openRandomSavedAO,
    openRandomSavedAOCreatedByYou,
    openSavedAOByName,
} from '../elements/FileMenu'
import {
    expectChartTitleToBeDirty,
    expectChartTitleToBeValue,
    expectChartTitleToNotBeDirty,
    expectVisualizationToBeVisible,
} from '../elements/Chart'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import { clickUpdate, selectRelativePeriods } from '../elements/DimensionsModal'
import { openDimension } from '../elements/DimensionsPanel'
import { VIS_TYPE_COLUMN } from '@dhis2/analytics'

describe('open', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    const ao = {
        name: 'ANC: 1-3 dropout rate Yearly',
        type: VIS_TYPE_COLUMN,
    }
    // TODO: Loop through a bunch of AOs

    it('loads a saved AO and displays correct title and type', () => {
        openSavedAOByName(ao.name)

        expectChartTitleToBeValue(ao.name)

        expectVisualizationToBeVisible(ao.type)
        expectChartTitleToNotBeDirty()
    })
    it(`adds a period and displays dirty state`, () => {
        openDimension('pe')
        selectRelativePeriods(['Last six-month'], 'Six-months')
        clickUpdate()
        expectChartTitleToBeDirty()
    })
})
