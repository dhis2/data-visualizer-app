import {
    isYearOverYear,
    visTypeDisplayNames,
    DIMENSION_ID_PERIOD,
} from '@dhis2/analytics'

import { createNewAO, openAOByName } from '../elements/fileMenu'
import { confirmLeave } from '../elements/confirmLeaveModal'
import {
    expectAOTitleToBeDirty,
    expectAOTitleToBeValue,
    expectAOTitleToNotBeDirty,
    expectVisualizationToBeVisible,
} from '../elements/chart'
import { goToStartPage } from '../elements/startScreen'
import {
    clickDimensionModalUpdateButton,
    selectRelativePeriods,
} from '../elements/dimensionModal'
import { openDimension } from '../elements/dimensionsPanel'
import { TEST_AOS } from '../utils/data'
import { selectYoyCategoryOption } from '../elements/layout'
import { clickMenuBarUpdateButton } from '../elements/menuBar'
import { expectRouteToBeAOId, expectRouteToBeEmpty } from '../elements/route'

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
