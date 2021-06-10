import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'
import {
    expectVisualizationToBeVisible,
    expectChartTitleToBeVisible,
} from '../../elements/chart'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../../elements/dimensionModal'
import { openDimension } from '../../elements/dimensionsPanel'
import { clickMenuBarOptionsButton } from '../../elements/menuBar'
import {
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    switchAxesTabTo,
    expectAxisRangeMaxToBeValue,
    expectAxisRangeMinToBeValue,
    expectAxisTitleToBeValue,
    OPTIONS_TAB_AXES,
    setAxisRangeMaxValue,
    setAxisRangeMinValue,
    setAxisTitleText,
    setAxisTitleToCustom,
} from '../../elements/optionsModal'
import { goToStartPage } from '../../elements/startScreen'
import { TEST_DATA_ELEMENTS } from '../../utils/data'
import { generateRandomNumber, getRandomArrayItem } from '../../utils/random'
import {
    expectWindowConfigYAxisToHaveRangeMinValue,
    expectWindowConfigYAxisToHaveRangeMaxValue,
    expectWindowConfigYAxisToHaveTitleText,
    expectWindowConfigXAxisToHaveTitleText,
} from '../../utils/window'

const TEST_DATA_ELEMENT_NAME = getRandomArrayItem(TEST_DATA_ELEMENTS).name
const TEST_MIN_VALUE = generateRandomNumber(-1000, 1000)
const TEST_MAX_VALUE = generateRandomNumber(2000, 5000)

describe('Options - Vertical axis', () => {
    const TEST_AXIS = 'RANGE_0'
    const TEST_TITLE = 'VT'
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
        it("set axis title to 'custom'", () => {
            setAxisTitleToCustom()
        })
        it('type title', () => {
            setAxisTitleText(TEST_AXIS, TEST_TITLE)
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
            setAxisRangeMinValue(TEST_AXIS, TEST_MIN_VALUE)
        })
        it('set max value', () => {
            setAxisRangeMaxValue(TEST_AXIS, TEST_MAX_VALUE)
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
    describe('options modal keeps changes when reopening', () => {
        it('opens Options -> Axes', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_AXES)
        })
        it(`title is "${TEST_TITLE}"`, () => {
            expectAxisTitleToBeValue(TEST_AXIS, TEST_TITLE)
        })
        it(`range min is "${TEST_MIN_VALUE}"`, () => {
            expectAxisRangeMinToBeValue(TEST_AXIS, TEST_MIN_VALUE)
        })
        it(`range max is "${TEST_MAX_VALUE}"`, () => {
            expectAxisRangeMaxToBeValue(TEST_AXIS, TEST_MAX_VALUE)
        })
    })
})

describe('Options - Horizontal axis', () => {
    const TEST_AXIS = 'DOMAIN_0'
    const TEST_TITLE = 'HT'
    const TEST_TAB = 'Horizontal (x) axis'
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
        it(`switch to '${TEST_TAB}' tab`, () => {
            switchAxesTabTo(TEST_TAB)
        })
        it("set axis title to 'custom'", () => {
            setAxisTitleToCustom()
        })
        it('type title', () => {
            setAxisTitleText(TEST_AXIS, TEST_TITLE)
        })
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it(`config has horizontal axis title "${TEST_TITLE}"`, () => {
            expectWindowConfigXAxisToHaveTitleText(TEST_TITLE)
        })
    })
    // TODO: labels
    describe('options modal keeps changes when reopening', () => {
        it('opens Options -> Axes', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_AXES)
        })
        it(`switch to '${TEST_TAB}' tab`, () => {
            switchAxesTabTo(TEST_TAB)
        })
        it(`title is "${TEST_TITLE}"`, () => {
            expectAxisTitleToBeValue(TEST_AXIS, TEST_TITLE)
        })
    })
})
