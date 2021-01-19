import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'

import { openDimension } from '../../elements/dimensionsPanel'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../../elements/dimensionModal'
import { goToStartPage } from '../../elements/startScreen'
import {
    expectVisualizationToBeVisible,
    expectChartTitleToBeVisible,
} from '../../elements/chart'
import { TEST_DATA_ELEMENTS } from '../../utils/data'
import { clickMenuBarOptionsButton } from '../../elements/menuBar'
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
} from '../../elements/optionsModal'
import {
    expectWindowConfigYAxisToHaveRangeMinValue,
    expectWindowConfigYAxisToHaveRangeMaxValue,
    expectWindowConfigYAxisToHaveTitleText,
} from '../../utils/window'
import { generateRandomNumber, getRandomArrayItem } from '../../utils/random'

const TEST_DATA_ELEMENT_NAME = getRandomArrayItem(TEST_DATA_ELEMENTS).name
const TEST_TITLE = 'Vert title'
const TEST_MIN_VALUE = generateRandomNumber(-1000, 1000)
const TEST_MAX_VALUE = generateRandomNumber(2000, 5000)

describe('Options - Vertical axis', () => {
    it('navigates to the start page and add a data item', () => {
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectDataElements([TEST_DATA_ELEMENT_NAME])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
    })
    describe('title', () => {
        it('opens Options -> Axes', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_AXES)
        })
        it('enable title', () => {
            enableVerticalAxisTitle()
        })
        it('set custom title', () => {
            setVerticalAxisTitle(TEST_TITLE)
        })
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it(`config has vertical axis title "${TEST_TITLE}"`, () => {
            expectWindowConfigYAxisToHaveTitleText(TEST_TITLE)
        })
    })
    describe('range', () => {
        it('opens Options -> Axes', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_AXES)
        })
        it('set min value', () => {
            setVerticalAxisRangeMinValue(TEST_MIN_VALUE)
        })
        it('set max value', () => {
            setVerticalAxisRangeMaxValue(TEST_MAX_VALUE)
        })
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it(`config has range min value "${TEST_MIN_VALUE}"`, () => {
            expectWindowConfigYAxisToHaveRangeMinValue(TEST_MIN_VALUE)
        })
        it(`config has range max value "${TEST_MAX_VALUE}"`, () => {
            expectWindowConfigYAxisToHaveRangeMaxValue(TEST_MAX_VALUE)
        })
    })
    // TODO: steps, decimals, labels
    describe('options modal keeps changes', () => {
        it('opens Options -> Axes', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_AXES)
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
