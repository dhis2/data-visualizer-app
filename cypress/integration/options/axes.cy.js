import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'
import {
    expectVisualizationToBeVisible,
    expectChartTitleToBeVisible,
} from '../../elements/chart.js'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { clickMenuBarOptionsButton } from '../../elements/menuBar.js'
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
    setAxisTitleTextModeTo,
    OPTIONS_TAB_SERIES,
    setItemToAxis,
    setAxisDecimalsValue,
    setAxisStepsValue,
} from '../../elements/optionsModal/index.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { CONFIG_DEFAULT_VERTICAL_AXIS_TITLE } from '../../utils/config.js'
import { TEST_DATA_ELEMENTS } from '../../utils/data.js'
import { generateRandomNumber, getRandomArrayItem } from '../../utils/random.js'
import {
    expectWindowConfigYAxisToHaveRangeMinValue,
    expectWindowConfigYAxisToHaveRangeMaxValue,
    expectWindowConfigYAxisToHaveTitleText,
    expectWindowConfigXAxisToHaveTitleText,
    expectWindowConfigYAxisToHaveStepsValue,
    expectWindowConfigAxisTitleToBeValue,
} from '../../utils/window.js'

const TEST_DATA_ELEMENT_NAME = getRandomArrayItem(TEST_DATA_ELEMENTS).name
const TEST_MIN_VALUE = generateRandomNumber(-1000, 1000)
const TEST_MAX_VALUE = generateRandomNumber(2000, 5000)
const TEST_STEPS_VALUE = generateRandomNumber(2, 8)
const TEST_DECIMALS_VALUE = generateRandomNumber(1, 3)

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
        it("sets axis title to 'Custom'", () => {
            setAxisTitleTextModeTo('Custom')
        })
        it('types the title', () => {
            setAxisTitleText(TEST_AXIS, TEST_TITLE)
        })
        it('clicks the modal update button', () => {
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
        it('sets min value', () => {
            setAxisRangeMinValue(TEST_AXIS, TEST_MIN_VALUE)
        })
        it('sets max value', () => {
            setAxisRangeMaxValue(TEST_AXIS, TEST_MAX_VALUE)
        })
        it('sets steps value', () => {
            setAxisStepsValue(TEST_AXIS, TEST_STEPS_VALUE)
        })
        it('sets decimals value', () => {
            setAxisDecimalsValue(TEST_AXIS, TEST_DECIMALS_VALUE)
        })
        it('clicks the modal update button', () => {
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it('config has range min value', () => {
            cy.log(`Value: ${TEST_MIN_VALUE}`)
            expectWindowConfigYAxisToHaveRangeMinValue(TEST_MIN_VALUE)
        })
        it('config has range max value', () => {
            cy.log(`Value: ${TEST_MAX_VALUE}`)
            expectWindowConfigYAxisToHaveRangeMaxValue(TEST_MAX_VALUE)
        })
        it('config has steps value', () => {
            cy.log(`Value: ${TEST_STEPS_VALUE}`)
            expectWindowConfigYAxisToHaveStepsValue(TEST_STEPS_VALUE)
        })
        // Note: the output of setting the decimals option can't be evaluated using the config
    })
    describe('options modal keeps changes when reopening', () => {
        it('opens Options -> Axes', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_AXES)
        })
        it(`title is "${TEST_TITLE}"`, () => {
            expectAxisTitleToBeValue(TEST_AXIS, TEST_TITLE)
        })
        it('range min is set', () => {
            cy.log(`Value: ${TEST_MIN_VALUE}`)
            expectAxisRangeMinToBeValue(TEST_AXIS, TEST_MIN_VALUE)
        })
        it('range max is set', () => {
            cy.log(`Value: ${TEST_MAX_VALUE}`)
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
        it(`switches to '${TEST_TAB}' tab`, () => {
            switchAxesTabTo(TEST_TAB)
        })
        it("sets axis title to 'Custom'", () => {
            setAxisTitleTextModeTo('Custom')
        })
        it('types the title', () => {
            setAxisTitleText(TEST_AXIS, TEST_TITLE)
        })
        it('clicks the modal update button', () => {
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        it(`config has horizontal axis title "${TEST_TITLE}"`, () => {
            expectWindowConfigXAxisToHaveTitleText(TEST_TITLE)
        })
    })
    describe('options modal keeps changes when reopening', () => {
        it('opens Options -> Axes', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_AXES)
        })
        it(`switches to '${TEST_TAB}' tab`, () => {
            switchAxesTabTo(TEST_TAB)
        })
        it(`title is "${TEST_TITLE}"`, () => {
            expectAxisTitleToBeValue(TEST_AXIS, TEST_TITLE)
        })
    })
})

describe('Options - Auto-generated axis title', () => {
    it('navigates to the start page and add a data item', () => {
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectDataElements([TEST_DATA_ELEMENT_NAME])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
    })
    describe('Single item - single axis', () => {
        it('opens Options -> Axes', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_AXES)
        })
        it("sets axis title to 'Auto generated'", () => {
            setAxisTitleTextModeTo('Auto generated')
        })
        it('clicks the modal update button', () => {
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        const TEST_TITLE = TEST_DATA_ELEMENT_NAME
        it(`config has vertical axis title "${TEST_TITLE}" and default black color`, () => {
            expectWindowConfigAxisTitleToBeValue('yAxis', 0, {
                ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE,
                text: TEST_TITLE,
                style: {
                    ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE.style,
                    color: '#212934',
                },
            })
        })
    })
    describe('Multi items - single axis', () => {
        it('adds a second data element', () => {
            openDimension(DIMENSION_ID_DATA)
            selectDataElements(['ART enrollment stage 1'])
            clickDimensionModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        const TEST_TITLE = '2 items'
        it(`config has vertical axis title "${TEST_TITLE} and default black color`, () => {
            expectWindowConfigAxisTitleToBeValue('yAxis', 0, {
                ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE,
                text: TEST_TITLE,
                style: {
                    ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE.style,
                    color: '#212934',
                },
            })
        })
    })
    describe('Multi items - multi axis', () => {
        it('navigates to the start page and adds two data items', () => {
            goToStartPage()
            openDimension(DIMENSION_ID_DATA)
            selectDataElements([
                TEST_DATA_ELEMENT_NAME,
                'ART enrollment stage 1',
            ])
            clickDimensionModalUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        })
        it('opens Options -> Series', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_SERIES)
        })
        it('enables multi axis', () => {
            setItemToAxis(1, 2)
        })
        it('opens Options -> Axes', () => {
            clickOptionsTab(OPTIONS_TAB_AXES)
        })
        it("sets axis title to 'Auto generated'", () => {
            setAxisTitleTextModeTo('Auto generated')
        })
        const TEST_TAB = 'Vertical (y) axis 2'
        it(`switches to '${TEST_TAB}' tab`, () => {
            switchAxesTabTo(TEST_TAB)
        })
        it("sets axis title to 'Auto generated'", () => {
            setAxisTitleTextModeTo('Auto generated')
        })
        it('clicks the modal update button', () => {
            clickOptionsModalUpdateButton()
            expectChartTitleToBeVisible()
        })
        const TEST_TITLE_1 = 'Axis 1'
        it(`config has vertical axis 1 title "${TEST_TITLE_1} and blue color`, () => {
            expectWindowConfigAxisTitleToBeValue('yAxis', 0, {
                ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE,
                text: TEST_TITLE_1,
                style: {
                    ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE.style,
                    color: '#4292c6',
                },
            })
        })
        const TEST_TITLE_2 = 'Axis 2'
        it(`config has vertical axis 2 title "${TEST_TITLE_2} and red color`, () => {
            expectWindowConfigAxisTitleToBeValue('yAxis', 1, {
                ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE,
                text: TEST_TITLE_2,
                style: {
                    ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE.style,
                    color: '#cb181d',
                },
            })
        })
    })
})
