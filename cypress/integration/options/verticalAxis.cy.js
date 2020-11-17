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
    expectVerticalAxisRangeMaxToBeValue,
    expectVerticalAxisRangeMinToBeValue,
    expectVerticalAxisTitleToBeValue,
    OPTIONS_TAB_AXES,
    setVerticalAxisRangeMaxValue,
    setVerticalAxisRangeMinValue,
    setVerticalAxisTitle,
} from '../../elements/OptionsModal'
import {
    expectStoreConfigYAxisToHaveRangeMinValue,
    expectStoreConfigYAxisToHaveRangeMaxValue,
    expectStoreConfigYAxisToHaveTitleText,
} from '../../utils/store'

const dimensionId = DIMENSION_ID_DATA
const dataElements = TEST_DATA_ELEMENTS.slice(3, 5).map(item => item.name)
const optionsTab = OPTIONS_TAB_AXES
const TEST_TITLE = 'Vert title'
const TEST_MIN_VALUE = 4895
const TEST_MAX_VALUE = 20578

describe('Options - Vertical axis', () => {
    before(() => {
        goToStartPage()
        openDimension(dimensionId)
        selectDataElements(dataElements)
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
    })
    describe('title', () => {
        it(`opens Options -> ${optionsTab}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(optionsTab)
        })
        it('enable title', () => {
            enableVerticalAxisTitle()
        })
        it('set custom title', () => {
            setVerticalAxisTitle(TEST_TITLE)
        })
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has vertical axis title "${TEST_TITLE}"`, () => {
            expectStoreConfigYAxisToHaveTitleText(TEST_TITLE)
        })
    })
    describe('range', () => {
        it(`opens Options -> ${optionsTab}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(optionsTab)
        })
        it('set min value', () => {
            setVerticalAxisRangeMinValue(TEST_MIN_VALUE)
        })
        it('set max value', () => {
            setVerticalAxisRangeMaxValue(TEST_MAX_VALUE)
        })
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has range min value "${TEST_MIN_VALUE}"`, () => {
            expectStoreConfigYAxisToHaveRangeMinValue(TEST_MIN_VALUE)
        })
        it(`config has range max value "${TEST_MAX_VALUE}"`, () => {
            expectStoreConfigYAxisToHaveRangeMaxValue(TEST_MAX_VALUE)
        })
    })
    // TODO: steps, decimals, labels
    describe('options modal keeps changes', () => {
        it(`opens Options -> ${optionsTab}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(optionsTab)
        })
        it(`title is "${TEST_TITLE}"`, () => {
            expectVerticalAxisTitleToBeValue(TEST_TITLE)
        })
        it(`range min is "${TEST_MIN_VALUE}"`, () => {
            expectVerticalAxisRangeMinToBeValue(TEST_MIN_VALUE)
        })
        it(`range max is "${TEST_MAX_VALUE}"`, () => {
            expectVerticalAxisRangeMaxToBeValue(TEST_MAX_VALUE)
        })
    })
})
