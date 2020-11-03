import { createNewAO, openSavedAOByName } from '../elements/FileMenu'
import { confirmLeave } from '../elements/ConfirmLeaveModal'
import {
    expectChartTitleToBeDirty,
    expectChartTitleToBeValue,
    expectChartTitleToNotBeDirty,
    expectVisualizationToBeVisible,
} from '../elements/Chart'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import {
    clickModalUpdateButton,
    selectRelativePeriods,
} from '../elements/DimensionsModal'
import { openDimension } from '../elements/DimensionsPanel'
import { TEST_AOS } from '../utils/data'
import { isYearOverYear, visTypeDisplayNames } from '@dhis2/analytics'
import { selectYoyCategoryOption } from '../elements/Layout'
import { clickMenuBarUpdateButton } from '../elements/MenuBar'

describe('open', () => {
    it('goes to DV', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    TEST_AOS.forEach(ao => {
        describe(visTypeDisplayNames[ao.type], () => {
            it('loads a saved AO and displays correct title and type', () => {
                openSavedAOByName(ao.name)

                expectChartTitleToBeValue(ao.name)

                expectVisualizationToBeVisible(ao.type)
                expectChartTitleToNotBeDirty()
            })
            it(`adds a period and displays dirty state`, () => {
                if (isYearOverYear(ao.type)) {
                    selectYoyCategoryOption('Last 2 six-months')
                    clickMenuBarUpdateButton()
                } else {
                    openDimension('pe')
                    selectRelativePeriods(['Last six-month'], 'Six-months')
                    clickModalUpdateButton()
                }

                expectChartTitleToBeDirty()
            })
            it('displays the updated visualization', () => {
                expectVisualizationToBeVisible(ao.type)
            })
            it('resets to a new AO', () => {
                createNewAO()
                confirmLeave(true)
            })
        })
    })
})
