import {
    isYearOverYear,
    visTypeDisplayNames,
    DIMENSION_ID_PERIOD,
} from '@dhis2/analytics'

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
                expectAOTitleToBeValue(ao.name)
                expectVisualizationToBeVisible(ao.type)
                expectAOTitleToNotBeDirty()
            })
            it(`adds a period`, () => {
                if (isYearOverYear(ao.type)) {
                    const TEST_PERIOD = 'Last 2 six-months'
                    selectYoyCategoryOption(TEST_PERIOD)
                    clickMenuBarUpdateButton()
                } else {
                    const TEST_PERIOD_TYPE = 'Six-months'
                    const TEST_PERIOD = 'Last six-month'
                    openDimension(DIMENSION_ID_PERIOD)
                    selectRelativePeriods([TEST_PERIOD], TEST_PERIOD_TYPE)
                    clickDimensionModalUpdateButton()
                }
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
