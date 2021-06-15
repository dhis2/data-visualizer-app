import { visTypeDisplayNames } from '@dhis2/analytics'
import {
    expectAOTitleToBeDirty,
    expectAOTitleToBeValue,
    expectAOTitleToNotBeDirty,
    expectVisualizationToBeVisible,
} from '../elements/chart'
import { replacePeriodItems } from '../elements/common'
import { confirmLeave } from '../elements/confirmLeaveModal'
import { createNewAO, openAOByName } from '../elements/fileMenu'
import { expectRouteToBeAOId, expectRouteToBeEmpty } from '../elements/route'
import { goToStartPage } from '../elements/startScreen'
import { TEST_AOS } from '../utils/data'

describe('opening a saved AO', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    TEST_AOS.forEach(ao => {
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
