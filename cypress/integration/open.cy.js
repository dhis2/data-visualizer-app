import { createNewAO, openAOByName } from '../elements/FileMenu'
import { confirmLeave } from '../elements/ConfirmLeaveModal'
import {
    expectAOTitleToBeDirty,
    expectAOTitleToBeValue,
    expectAOTitleToNotBeDirty,
    expectVisualizationToBeVisible,
} from '../elements/Chart'
import { goToStartPage } from '../elements/StartScreen'
import {
    clickDimensionModalUpdateButton,
    selectRelativePeriods,
} from '../elements/DimensionModal'
import { openDimension } from '../elements/DimensionsPanel'
import { TEST_AOS } from '../utils/data'
import { isYearOverYear, visTypeDisplayNames } from '@dhis2/analytics'
import { selectYoyCategoryOption } from '../elements/Layout'
import { clickMenuBarUpdateButton } from '../elements/MenuBar'
import { expectRouteToBeAOId, expectRouteToBeEmpty } from '../elements/Route'

describe('opening a saved AO', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    TEST_AOS.forEach(ao => {
        describe(visTypeDisplayNames[ao.type], () => {
            it('opens a saved AO ', () => {
                openAOByName(ao.name)
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
                    clickDimensionModalUpdateButton()
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
