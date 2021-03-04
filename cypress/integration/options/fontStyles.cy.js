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
    expectChartSubtitleToBeVisible,
} from '../../elements/chart'
import {
    expectWindowConfigSubtitleToBeValue,
    expectWindowConfigTitleToBeValue,
    expectWindowConfigLegendToBeValue,
    expectWindowConfigAxisPlotLinesToBeValue,
} from '../../utils/window'
import { TEST_DATA_ELEMENTS } from '../../utils/data'
import {
    CONFIG_DEFAULT_SUBTITLE,
    CONFIG_DEFAULT_TITLE,
    CONFIG_DEFAULT_LEGEND,
    CONFIG_DEFAULT_TARGET_LINE,
} from '../../utils/config'
import { clickMenuBarOptionsButton } from '../../elements/menuBar'
import {
    changeFontSizeOption,
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    OPTIONS_TAB_STYLE,
    changeTextAlignOption,
    clickBoldButton,
    clickItalicButton,
    setCustomSubtitle,
    OPTIONS_TAB_DATA,
    clickTargetLineCheckbox,
    setTargetLineValue,
    setTargetLineLabel,
} from '../../elements/optionsModal'
import {
    generateRandomBool,
    generateRandomNumber,
    getRandomArrayItem,
} from '../../utils/random'

const TEST_DATA_ELEMENT_NAME = getRandomArrayItem(TEST_DATA_ELEMENTS).name
const TITLE_PREFIX = 'option-chart-title'
const SUBTITLE_PREFIX = 'option-chart-subtitle'
const LEGEND_PREFIX = 'option-legend-key'
const TARGET_LINE_PREFIX = 'option-target-line-label'

const randomizeBoldOption = () => {
    const useBold = generateRandomBool()
    return { input: useBold, output: useBold ? 'bold' : 'normal' }
}

const randomizeItalicOption = () => {
    const useItalic = generateRandomBool()
    return { input: useItalic, output: useItalic ? 'italic' : 'normal' }
}

// TODO: Refactor to use the "describe - describe - it" model

describe('Options - Font styles', () => {
    it('navigates to the start page and adds a data item', () => {
        goToStartPage()
        openDimension(DIMENSION_ID_DATA)
        selectDataElements([TEST_DATA_ELEMENT_NAME])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
    })
    describe('title', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Small', output: '13px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Left', output: 'left' }
            : { input: 'Right', output: 'right' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const prefix = TITLE_PREFIX

        it('has default value', () => {
            expectChartTitleToBeVisible()
            expectWindowConfigTitleToBeValue(CONFIG_DEFAULT_TITLE)
        })
        it('opens Options -> Style', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
        })
        it(`changes the font size to ${TEST_FONT_SIZE_OPTION.input}`, () => {
            changeFontSizeOption(prefix, TEST_FONT_SIZE_OPTION.input)
        })
        it(`changes the text align to ${TEST_TEXT_ALIGN_OPTION.input}`, () => {
            changeTextAlignOption(prefix, TEST_TEXT_ALIGN_OPTION.input)
        })
        if (TEST_BOLD_OPTION.input) {
            it('changes font to bold', () => {
                clickBoldButton(prefix)
            })
        }
        if (TEST_ITALIC_OPTION.input) {
            it('changes font to italic', () => {
                clickItalicButton(prefix)
            })
        }
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has font size "${TEST_FONT_SIZE_OPTION.output}", text align ${TEST_TEXT_ALIGN_OPTION.output}, bold true, italic true`, () => {
            expectChartTitleToBeVisible()
            expectWindowConfigTitleToBeValue({
                ...CONFIG_DEFAULT_TITLE,
                align: TEST_TEXT_ALIGN_OPTION.output,
                style: {
                    ...CONFIG_DEFAULT_TITLE.style,
                    fontSize: TEST_FONT_SIZE_OPTION.output,
                    fontWeight: TEST_BOLD_OPTION.output,
                    fontStyle: TEST_ITALIC_OPTION.output,
                },
            })
        })
    })
    describe('subtitle', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Regular', output: '18px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Left', output: 'left' }
            : { input: 'Right', output: 'right' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const prefix = SUBTITLE_PREFIX
        const TEST_SUBTITLE_TEXT = 'Test subtitle'

        it('has default value', () => {
            expectChartSubtitleToBeVisible()
            expectWindowConfigSubtitleToBeValue(CONFIG_DEFAULT_SUBTITLE)
        })
        it('opens Options -> Style', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
        })
        it('sets a custom subtitle', () => {
            setCustomSubtitle(TEST_SUBTITLE_TEXT)
        })
        it(`changes the font size to ${TEST_FONT_SIZE_OPTION.input}`, () => {
            changeFontSizeOption(prefix, TEST_FONT_SIZE_OPTION.input)
        })
        it(`changes the text align to ${TEST_TEXT_ALIGN_OPTION.input}`, () => {
            changeTextAlignOption(prefix, TEST_TEXT_ALIGN_OPTION.input)
        })
        if (TEST_BOLD_OPTION.input) {
            it('changes font to bold', () => {
                clickBoldButton(prefix)
            })
        }
        if (TEST_ITALIC_OPTION.input) {
            it('changes font to italic', () => {
                clickItalicButton(prefix)
            })
        }
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has font size "${TEST_FONT_SIZE_OPTION.output}", text align ${TEST_TEXT_ALIGN_OPTION.output}, bold true, italic true`, () => {
            expectChartSubtitleToBeVisible()
            expectWindowConfigSubtitleToBeValue({
                ...CONFIG_DEFAULT_SUBTITLE,
                align: TEST_TEXT_ALIGN_OPTION.output,
                text: TEST_SUBTITLE_TEXT,
                style: {
                    ...CONFIG_DEFAULT_SUBTITLE.style,
                    fontSize: TEST_FONT_SIZE_OPTION.output,
                    fontWeight: TEST_BOLD_OPTION.output,
                    fontStyle: TEST_ITALIC_OPTION.output,
                },
            })
        })
    })
    describe('target line', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Large', output: '18px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Center', output: 'center', x: 0 }
            : { input: 'Right', output: 'right', x: -10 }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_LABEL = 'Test target line'
        const TEST_VALUE = generateRandomNumber(10, 100)
        const prefix = TARGET_LINE_PREFIX

        it('opens Options -> Data', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_DATA)
        })
        it(`sets target line to ${TEST_VALUE}: "${TEST_LABEL}"`, () => {
            clickTargetLineCheckbox()
            setTargetLineLabel(TEST_LABEL)
            setTargetLineValue(TEST_VALUE)
        })
        it(`changes the font size to ${TEST_FONT_SIZE_OPTION.input}`, () => {
            changeFontSizeOption(prefix, TEST_FONT_SIZE_OPTION.input)
        })
        it(`changes the text align to ${TEST_TEXT_ALIGN_OPTION.input}`, () => {
            changeTextAlignOption(prefix, TEST_TEXT_ALIGN_OPTION.input)
        })
        if (TEST_BOLD_OPTION.input) {
            it('changes font to bold', () => {
                clickBoldButton(prefix)
            })
        }
        if (TEST_ITALIC_OPTION.input) {
            it('changes font to italic', () => {
                clickItalicButton(prefix)
            })
        } // TODO: Refactor the 4 option steps above to a function to avoid repetition
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has font size "${TEST_FONT_SIZE_OPTION.output}", text align ${TEST_TEXT_ALIGN_OPTION.output}, bold true, italic true`, () => {
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
            expectWindowConfigAxisPlotLinesToBeValue('yAxis', 0, {
                ...CONFIG_DEFAULT_TARGET_LINE,
                value: TEST_VALUE,
                label: {
                    ...CONFIG_DEFAULT_TARGET_LINE.label,
                    x: TEST_TEXT_ALIGN_OPTION.x,
                    text: TEST_LABEL,
                    align: TEST_TEXT_ALIGN_OPTION.output,
                    style: {
                        ...CONFIG_DEFAULT_TARGET_LINE.label.style,
                        fontSize: TEST_FONT_SIZE_OPTION.output,
                        fontWeight: TEST_BOLD_OPTION.output,
                        fontStyle: TEST_ITALIC_OPTION.output,
                    },
                },
            })
        })
    })
    describe('legend key', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Extra Large', output: '24px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Left', output: 'left' }
            : { input: 'Right', output: 'right' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const prefix = LEGEND_PREFIX

        it('opens Options -> Style', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
        })
        it(`changes the font size to ${TEST_FONT_SIZE_OPTION.input}`, () => {
            changeFontSizeOption(prefix, TEST_FONT_SIZE_OPTION.input)
        })
        it(`changes the text align to ${TEST_TEXT_ALIGN_OPTION.input}`, () => {
            changeTextAlignOption(prefix, TEST_TEXT_ALIGN_OPTION.input)
        })
        if (TEST_BOLD_OPTION.input) {
            it('changes font to bold', () => {
                clickBoldButton(prefix)
            })
        }
        if (TEST_ITALIC_OPTION.input) {
            it('changes font to italic', () => {
                clickItalicButton(prefix)
            })
        }
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has font size "${TEST_FONT_SIZE_OPTION.output}", text align ${TEST_TEXT_ALIGN_OPTION.output}, bold true, italic true`, () => {
            expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
            expectWindowConfigLegendToBeValue({
                ...CONFIG_DEFAULT_LEGEND,
                align: TEST_TEXT_ALIGN_OPTION.output,
                itemStyle: {
                    ...CONFIG_DEFAULT_LEGEND.itemStyle,
                    fontSize: TEST_FONT_SIZE_OPTION.output,
                    fontWeight: TEST_BOLD_OPTION.output,
                    fontStyle: TEST_ITALIC_OPTION.output,
                },
            })
        })
    })

    /*  TODO: 
        base line - option-base-line-label-text-style-font-size-select
        vertical axis title - RANGE_0-axis-title-text-style-font-size-select
        vertical labels - option-axis-label-RANGE_0-text-style-font-size-select
        horizontal axis title - DOMAIN_0-axis-title-text-style-font-size-select
        horizontal labels - option-axis-label-DOMAIN_0-text-style-font-size-select
    */
})
