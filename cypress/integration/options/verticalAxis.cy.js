import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'

import { openDimension } from '../../elements/DimensionsPanel'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../../elements/DimensionModal'
import { goToStartPage } from '../../elements/StartScreen'
import { expectVisualizationToBeVisible } from '../../elements/Chart'
import { TEST_DATA_ELEMENTS } from '../../utils/data'
import { clickMenuBarOptionsButton } from '../../elements/MenuBar'
import {
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    enableVerticalAxisTitle,
    OPTIONS_TAB_AXES,
    setVerticalAxisTitle,
} from '../../elements/OptionsModal'
import { expectStoreConfigYAxisToHaveTitleText } from '../../utils/store'

const dimensionId = DIMENSION_ID_DATA
const dataElements = TEST_DATA_ELEMENTS.slice(3, 5).map(item => item.name)

describe('Options - Vertical axis', () => {
    it('navigates to the start page', () => {
        goToStartPage()
    })
    it('adds dimensions', () => {
        openDimension(dimensionId)

        selectDataElements(dataElements)

        clickDimensionModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
    })
    describe('title', () => {
        const optionsTab = OPTIONS_TAB_AXES
        const TEST_TITLE = 'Vert title'
        it(`opens Options -> ${optionsTab}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(optionsTab)
        })
        it('enable title', () => {
            enableVerticalAxisTitle()
        })
        it('select trendline type', () => {
            setVerticalAxisTitle(TEST_TITLE)
        })
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has vertical axis title "${TEST_TITLE}"`, () => {
            expectStoreConfigYAxisToHaveTitleText(TEST_TITLE)
        })
    })
    // TODO: range, steps, decimals, labels
})
