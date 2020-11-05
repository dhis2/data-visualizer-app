import { createNewAO, openSavedAOByName } from '../elements/FileMenu'
import { confirmLeave } from '../elements/ConfirmLeaveModal'
import {
    expectAOTitleToBeDirty,
    expectAOTitleToBeValue,
    expectAOTitleToNotBeDirty,
    expectVisualizationToBeVisible,
} from '../elements/Chart'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import {
    clickModalUpdateButton,
    selectRelativePeriods,
} from '../elements/DimensionModal'
import { openDimension } from '../elements/DimensionsPanel'
import { TEST_AOS } from '../utils/data'
import { isYearOverYear, visTypeDisplayNames } from '@dhis2/analytics'
import { selectYoyCategoryOption } from '../elements/Layout'
import { clickMenuBarUpdateButton } from '../elements/MenuBar'
import { expectRouteToBeAOId, expectRouteToBeEmpty } from '../elements/Route'

describe('open', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    TEST_AOS.forEach(ao => {
        describe(visTypeDisplayNames[ao.type], () => {
            it('loads a saved AO ', () => {
                openSavedAOByName(ao.name)
                expectRouteToBeAOId()
            })
            it('displays correct title and type', () => {
                expectAOTitleToBeValue(ao.name)

                expectVisualizationToBeVisible(ao.type)
                expectAOTitleToNotBeDirty()
            })
            it(`adds a period`, () => {
                if (isYearOverYear(ao.type)) {
                    selectYoyCategoryOption('Last 2 six-months')
                    clickMenuBarUpdateButton()
                } else {
                    openDimension('pe')
                    selectRelativePeriods(['Last six-month'], 'Six-months')
                    clickModalUpdateButton()
                }
            })
            it(`displays dirty state`, () => {
                expectAOTitleToBeDirty()
            })
            it('displays the updated visualization', () => {
                expectVisualizationToBeVisible(ao.type)
            })
            it('resets to a new AO', () => {
                createNewAO()
                confirmLeave(true)
                expectRouteToBeEmpty()
            })
        })
    })
})
