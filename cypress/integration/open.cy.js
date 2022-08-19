import { visTypeDisplayNames } from '@dhis2/analytics'
import {
    expectAOTitleToBeDirty,
    expectAOTitleToBeValue,
    expectAOTitleToNotBeDirty,
    expectAOTitleToBeUnsaved,
    expectVisualizationToBeVisible,
} from '../elements/chart.js'
import { replacePeriodItems } from '../elements/common.js'
import { confirmLeave } from '../elements/confirmLeaveModal.js'
import { createNewAO, openAOByName } from '../elements/fileMenu/index.js'
import { expectRouteToBeAOId, expectRouteToBeEmpty } from '../elements/route.js'
import { goToStartPage } from '../elements/startScreen.js'
import currentAnalyticalObjectFixture from '../fixtures/currentAnalyticalObject.json'
import { EXTENDED_TIMEOUT } from '../support/util.js'
import { TEST_AOS } from '../utils/data.js'

describe('opening a saved AO', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    TEST_AOS.forEach((ao) => {
        // FIXME: Add a saved Scatter chart to the default database
        describe(visTypeDisplayNames[ao.type], () => {
            it(
                'opens a saved AO ',
                {
                    retries: 2,
                },
                () => {
                    openAOByName(ao.name)
                    expectRouteToBeAOId()
                    expectAOTitleToBeValue(ao.name)
                    expectVisualizationToBeVisible(ao.type)
                    expectAOTitleToNotBeDirty()
                }
            )
            it(`replaces the selected period`, () => {
                replacePeriodItems(ao.type)
                expectAOTitleToBeDirty()
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

describe('opening the currentAnalyticalObject', () => {
    it('loads an AO from the userDataStore when navigating to currentAnalyticalObject', () => {
        cy.intercept('**/userDataStore/analytics/settings', {
            fixture: 'currentAnalyticalObject.json',
        })

        const ao = currentAnalyticalObjectFixture.currentAnalyticalObject

        cy.visit('/#/currentAnalyticalObject', EXTENDED_TIMEOUT)

        expectVisualizationToBeVisible(ao.type)
        expectAOTitleToBeUnsaved()
    })
})
