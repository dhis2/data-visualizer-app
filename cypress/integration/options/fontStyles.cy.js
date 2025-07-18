import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    getDisplayNameByVisType,
} from '@dhis2/analytics'
import {
    expectVisualizationToBeVisible,
    expectChartTitleToBeVisible,
    expectChartSubtitleToBeVisible,
} from '../../elements/chart.js'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { openOptionsModal } from '../../elements/menuBar.js'
import {
    changeFontSizeOption,
    clickOptionsModalUpdateButton,
    changeTextAlignOption,
    clickBoldButton,
    clickItalicButton,
    setCustomSubtitle,
    OPTIONS_TAB_STYLE,
    OPTIONS_TAB_DATA,
    OPTIONS_TAB_AXES,
    checkTargetLineCheckbox,
    setTargetLineValue,
    setTargetLineLabel,
    checkBaseLineCheckbox,
    setBaseLineLabel,
    setBaseLineValue,
    setAxisTitleText,
    setAxisTitleTextModeTo,
    switchAxesTabTo,
    changeColor,
} from '../../elements/optionsModal/index.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'
import {
    CONFIG_DEFAULT_SUBTITLE,
    CONFIG_DEFAULT_TITLE,
    CONFIG_DEFAULT_LEGEND,
    CONFIG_DEFAULT_TARGET_LINE,
    CONFIG_DEFAULT_BASE_LINE,
    CONFIG_DEFAULT_VERTICAL_AXIS_TITLE,
    CONFIG_DEFAULT_HORIZONTAL_AXIS_TITLE,
    CONFIG_DEFAULT_AXIS_LABELS,
} from '../../utils/config.js'
import { TEST_DATA_ELEMENTS } from '../../utils/data.js'
import {
    generateRandomBool,
    generateRandomNumber,
    getRandomArrayItem,
} from '../../utils/random.js'
import {
    expectWindowConfigSubtitleToBeValue,
    expectWindowConfigTitleToBeValue,
    expectWindowConfigLegendToBeValue,
    expectWindowConfigAxisPlotLinesToBeValue,
    expectWindowConfigAxisTitleToBeValue,
    expectWindowConfigAxisLabelsToBeValue,
} from '../../utils/window.js'

const TEST_DATA_ELEMENT_NAME = getRandomArrayItem(TEST_DATA_ELEMENTS).name
const TITLE_PREFIX = 'option-chart-title'
const SUBTITLE_PREFIX = 'option-chart-subtitle'
const SERIES_KEY_PREFIX = 'option-series-key'
const TARGET_LINE_PREFIX = 'option-target-line-label'
const BASE_LINE_PREFIX = 'option-base-line-label'
const VERTICAL_AXIS_TITLE_PREFIX = 'RANGE_0-axis-title'
const HORIZONTAL_AXIS_TITLE_PREFIX = 'DOMAIN_0-axis-title'
const VERTICAL_AXIS_LABELS_PREFIX = 'option-axis-label-RANGE_0'
const HORIZONTAL_AXIS_LABELS_PREFIX = 'option-axis-label-DOMAIN_0'

const randomizeBoldOption = () => {
    const useBold = generateRandomBool()
    return { input: useBold, output: useBold ? 'bold' : 'normal' }
}

const randomizeItalicOption = () => {
    const useItalic = generateRandomBool()
    return { input: useItalic, output: useItalic ? 'italic' : 'normal' }
}

const setFontStyleOptions = ({
    fontSize,
    textAlign,
    bold,
    italic,
    color,
    prefix,
}) => {
    fontSize && changeFontSizeOption(prefix, fontSize)
    textAlign && changeTextAlignOption(prefix, textAlign)
    bold && clickBoldButton(prefix)
    italic && clickItalicButton(prefix)
    color && changeColor(prefix, color)
}

const setUpVis = () => {
    goToStartPage()
    changeVisType(getDisplayNameByVisType(VIS_TYPE_COLUMN))
    openDimension(DIMENSION_ID_DATA)
    selectDataElements([TEST_DATA_ELEMENT_NAME])
    clickDimensionModalUpdateButton()
    expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
}

describe('Options - Font styles', () => {
    it('title', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Small', output: '13px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Left', output: 'left' }
            : { input: 'Right', output: 'right' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_COLOR = '#fafa00'
        const prefix = TITLE_PREFIX

        setUpVis()

        expectChartTitleToBeVisible()
        expectWindowConfigTitleToBeValue(CONFIG_DEFAULT_TITLE)

        // opens Options -> Style
        openOptionsModal(OPTIONS_TAB_STYLE)

        setFontStyleOptions({
            fontSize: TEST_FONT_SIZE_OPTION.input,
            textAlign: TEST_TEXT_ALIGN_OPTION.input,
            bold: TEST_BOLD_OPTION.input,
            italic: TEST_ITALIC_OPTION.input,
            color: TEST_COLOR,
            prefix,
        })
        // clicks the modal update button
        clickOptionsModalUpdateButton()

        expectChartTitleToBeVisible()

        // config has font size "${TEST_FONT_SIZE_OPTION.output}",
        // text align ${TEST_TEXT_ALIGN_OPTION.output},
        // bold ${TEST_BOLD_OPTION.input},
        // italic ${TEST_ITALIC_OPTION.input},
        // color ${TEST_COLOR}
        expectWindowConfigTitleToBeValue({
            ...CONFIG_DEFAULT_TITLE,
            align: TEST_TEXT_ALIGN_OPTION.output,
            style: {
                ...CONFIG_DEFAULT_TITLE.style,
                fontSize: TEST_FONT_SIZE_OPTION.output,
                fontWeight: TEST_BOLD_OPTION.output,
                fontStyle: TEST_ITALIC_OPTION.output,
                color: TEST_COLOR,
            },
        })
    })

    it('subtitle', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Regular', output: '18px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Left', output: 'left' }
            : { input: 'Right', output: 'right' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_COLOR = '#fa00fa'
        const prefix = SUBTITLE_PREFIX
        const TEST_SUBTITLE_TEXT = 'S'
        setUpVis()
        expectWindowConfigSubtitleToBeValue(CONFIG_DEFAULT_SUBTITLE)

        // opens Options -> Style
        openOptionsModal(OPTIONS_TAB_STYLE)

        // sets a custom subtitle
        setCustomSubtitle(TEST_SUBTITLE_TEXT)

        setFontStyleOptions({
            fontSize: TEST_FONT_SIZE_OPTION.input,
            textAlign: TEST_TEXT_ALIGN_OPTION.input,
            bold: TEST_BOLD_OPTION.input,
            italic: TEST_ITALIC_OPTION.input,
            color: TEST_COLOR,
            prefix,
        })

        // clicks the modal update button
        clickOptionsModalUpdateButton()

        expectChartSubtitleToBeVisible()
        // config has font size "${TEST_FONT_SIZE_OPTION.output}"
        // text align ${TEST_TEXT_ALIGN_OPTION.output}
        // bold ${TEST_BOLD_OPTION.input}
        // italic ${TEST_ITALIC_OPTION.input}
        // color ${TEST_COLOR}
        expectWindowConfigSubtitleToBeValue({
            ...CONFIG_DEFAULT_SUBTITLE,
            align: TEST_TEXT_ALIGN_OPTION.output,
            text: TEST_SUBTITLE_TEXT,
            style: {
                ...CONFIG_DEFAULT_SUBTITLE.style,
                fontSize: TEST_FONT_SIZE_OPTION.output,
                fontWeight: TEST_BOLD_OPTION.output,
                fontStyle: TEST_ITALIC_OPTION.output,
                color: TEST_COLOR,
            },
        })
    })

    it('target line', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Small', output: '11px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Center', output: 'center', x: 0 }
            : { input: 'Right', output: 'right', x: -10 }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_COLOR = '#00fafa'
        const TEST_LABEL = 'TL'
        const TEST_VALUE = generateRandomNumber(10, 100)
        const prefix = TARGET_LINE_PREFIX
        setUpVis()

        openOptionsModal(OPTIONS_TAB_DATA)

        // sets a target line
        checkTargetLineCheckbox()
        setTargetLineLabel(TEST_LABEL)
        setTargetLineValue(TEST_VALUE)

        setFontStyleOptions({
            fontSize: TEST_FONT_SIZE_OPTION.input,
            textAlign: TEST_TEXT_ALIGN_OPTION.input,
            bold: TEST_BOLD_OPTION.input,
            italic: TEST_ITALIC_OPTION.input,
            color: TEST_COLOR,
            prefix,
        })

        // clicks the modal update button
        clickOptionsModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // config has font size "${TEST_FONT_SIZE_OPTION.output}",
        // text align ${TEST_TEXT_ALIGN_OPTION.output},
        // bold ${TEST_BOLD_OPTION.input},
        // italic ${TEST_ITALIC_OPTION.input},
        // color ${TEST_COLOR}
        expectWindowConfigAxisPlotLinesToBeValue({
            axisType: 'yAxis',
            axisIndex: 0,
            lineIndex: 0,
            value: {
                ...CONFIG_DEFAULT_TARGET_LINE,
                value: TEST_VALUE,
                color: TEST_COLOR,
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
                        color: TEST_COLOR,
                    },
                },
            },
        })
    })

    it('base line', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Large', output: '18px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Center', output: 'center', x: 0 }
            : { input: 'Right', output: 'right', x: -10 }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_COLOR = '#99fa99'
        const TEST_LABEL = 'BL'
        const TEST_VALUE = generateRandomNumber(10, 100)
        const prefix = BASE_LINE_PREFIX

        setUpVis()

        //opens Options -> Data
        openOptionsModal(OPTIONS_TAB_DATA)
        // sets base line
        checkBaseLineCheckbox()
        setBaseLineLabel(TEST_LABEL)
        setBaseLineValue(TEST_VALUE)

        setFontStyleOptions({
            fontSize: TEST_FONT_SIZE_OPTION.input,
            textAlign: TEST_TEXT_ALIGN_OPTION.input,
            bold: TEST_BOLD_OPTION.input,
            italic: TEST_ITALIC_OPTION.input,
            color: TEST_COLOR,
            prefix,
        })
        // clicks the modal update button
        clickOptionsModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // config has font size "${TEST_FONT_SIZE_OPTION.output}",
        // text align ${TEST_TEXT_ALIGN_OPTION.output},
        // bold ${TEST_BOLD_OPTION.input},
        // italic ${TEST_ITALIC_OPTION.input},
        // color ${TEST_COLOR}

        expectWindowConfigAxisPlotLinesToBeValue({
            axisType: 'yAxis',
            axisIndex: 0,
            lineIndex: 0,
            value: {
                ...CONFIG_DEFAULT_BASE_LINE,
                value: TEST_VALUE,
                color: TEST_COLOR,
                label: {
                    ...CONFIG_DEFAULT_BASE_LINE.label,
                    x: TEST_TEXT_ALIGN_OPTION.x,
                    text: TEST_LABEL,
                    align: TEST_TEXT_ALIGN_OPTION.output,
                    style: {
                        ...CONFIG_DEFAULT_BASE_LINE.label.style,
                        fontSize: TEST_FONT_SIZE_OPTION.output,
                        fontWeight: TEST_BOLD_OPTION.output,
                        fontStyle: TEST_ITALIC_OPTION.output,
                        color: TEST_COLOR,
                    },
                },
            },
        })
    })

    it('series key', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Extra Large', output: '24px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Left', output: 'left' }
            : { input: 'Right', output: 'right' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_COLOR = '#9090fa'
        const prefix = SERIES_KEY_PREFIX

        setUpVis()

        // opens Options -> Style
        openOptionsModal(OPTIONS_TAB_STYLE)

        setFontStyleOptions({
            fontSize: TEST_FONT_SIZE_OPTION.input,
            textAlign: TEST_TEXT_ALIGN_OPTION.input,
            bold: TEST_BOLD_OPTION.input,
            italic: TEST_ITALIC_OPTION.input,
            color: TEST_COLOR,
            prefix,
        })
        // clicks the modal update button
        clickOptionsModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // config has font size "${TEST_FONT_SIZE_OPTION.output}",
        // text align ${TEST_TEXT_ALIGN_OPTION.output},
        // bold ${TEST_BOLD_OPTION.input},
        // italic ${TEST_ITALIC_OPTION.input},
        // color ${TEST_COLOR}
        expectWindowConfigLegendToBeValue({
            ...CONFIG_DEFAULT_LEGEND,
            align: TEST_TEXT_ALIGN_OPTION.output,
            itemStyle: {
                ...CONFIG_DEFAULT_LEGEND.itemStyle,
                fontSize: TEST_FONT_SIZE_OPTION.output,
                fontWeight: TEST_BOLD_OPTION.output,
                fontStyle: TEST_ITALIC_OPTION.output,
                color: TEST_COLOR,
            },
        })
    })

    it('vertical axis labels', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Regular', output: '13px' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_COLOR = '#0909fa'
        const prefix = VERTICAL_AXIS_LABELS_PREFIX

        setUpVis()

        // opens Options -> Axes
        openOptionsModal(OPTIONS_TAB_AXES)

        setFontStyleOptions({
            fontSize: TEST_FONT_SIZE_OPTION.input,
            bold: TEST_BOLD_OPTION.input,
            italic: TEST_ITALIC_OPTION.input,
            color: TEST_COLOR,
            prefix,
        })
        // clicks the modal update button
        clickOptionsModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // config has font size "${TEST_FONT_SIZE_OPTION.output}",
        // bold ${TEST_BOLD_OPTION.input},
        // italic ${TEST_ITALIC_OPTION.input},
        // color ${TEST_COLOR}
        expectWindowConfigAxisLabelsToBeValue('yAxis', 0, {
            ...CONFIG_DEFAULT_AXIS_LABELS,
            style: {
                ...CONFIG_DEFAULT_AXIS_LABELS.style,
                fontSize: TEST_FONT_SIZE_OPTION.output,
                fontWeight: TEST_BOLD_OPTION.output,
                fontStyle: TEST_ITALIC_OPTION.output,
                color: TEST_COLOR,
            },
        })
    })

    it('horizontal axis labels', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Large', output: '18px' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_COLOR = '#fa0909'
        const prefix = HORIZONTAL_AXIS_LABELS_PREFIX

        // opens Options -> Axes
        openOptionsModal(OPTIONS_TAB_AXES)
        switchAxesTabTo('Horizontal (x) axis')

        setFontStyleOptions({
            fontSize: TEST_FONT_SIZE_OPTION.input,
            bold: TEST_BOLD_OPTION.input,
            italic: TEST_ITALIC_OPTION.input,
            color: TEST_COLOR,
            prefix,
        })
        // clicks the modal update button
        clickOptionsModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // config has font size "${TEST_FONT_SIZE_OPTION.output}",
        // bold ${TEST_BOLD_OPTION.input},
        // italic ${TEST_ITALIC_OPTION.input},
        // color ${TEST_COLOR}
        expectWindowConfigAxisLabelsToBeValue('xAxis', 0, {
            ...CONFIG_DEFAULT_AXIS_LABELS,
            style: {
                ...CONFIG_DEFAULT_AXIS_LABELS.style,
                fontSize: TEST_FONT_SIZE_OPTION.output,
                fontWeight: TEST_BOLD_OPTION.output,
                fontStyle: TEST_ITALIC_OPTION.output,
                color: TEST_COLOR,
            },
        })
    })

    it('horizontal axis title', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Extra Small', output: '9px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Start', output: 'low' }
            : { input: 'End', output: 'high' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_COLOR = '#0f9a09'
        const TEST_TITLE = 'HT'
        const TEST_AXIS = 'DOMAIN_0'
        const prefix = HORIZONTAL_AXIS_TITLE_PREFIX

        // opens Options -> Axes
        openOptionsModal(OPTIONS_TAB_AXES)

        // sets horizontal axis title to "${TEST_TITLE}"
        switchAxesTabTo('Horizontal (x) axis')
        setAxisTitleTextModeTo('Custom')
        setAxisTitleText(TEST_AXIS, TEST_TITLE)

        setFontStyleOptions({
            fontSize: TEST_FONT_SIZE_OPTION.input,
            textAlign: TEST_TEXT_ALIGN_OPTION.input,
            bold: TEST_BOLD_OPTION.input,
            italic: TEST_ITALIC_OPTION.input,
            color: TEST_COLOR,
            prefix,
        })
        // clicks the modal update button
        clickOptionsModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // config has font size "${TEST_FONT_SIZE_OPTION.output}",
        // text align ${TEST_TEXT_ALIGN_OPTION.output},
        // bold ${TEST_BOLD_OPTION.input},
        // italic ${TEST_ITALIC_OPTION.input},
        // color ${TEST_COLOR}
        expectWindowConfigAxisTitleToBeValue('xAxis', 0, {
            ...CONFIG_DEFAULT_HORIZONTAL_AXIS_TITLE,
            text: TEST_TITLE,
            align: TEST_TEXT_ALIGN_OPTION.output,
            style: {
                ...CONFIG_DEFAULT_HORIZONTAL_AXIS_TITLE.style,
                fontSize: TEST_FONT_SIZE_OPTION.output,
                fontWeight: TEST_BOLD_OPTION.output,
                fontStyle: TEST_ITALIC_OPTION.output,
                color: TEST_COLOR,
            },
        })
    })

    it('vertical axis title', () => {
        const TEST_FONT_SIZE_OPTION = { input: 'Large', output: '18px' }
        const TEST_TEXT_ALIGN_OPTION = generateRandomBool()
            ? { input: 'Start', output: 'low' }
            : { input: 'End', output: 'high' }
        const TEST_BOLD_OPTION = randomizeBoldOption()
        const TEST_ITALIC_OPTION = randomizeItalicOption()
        const TEST_COLOR = '#a090f9'
        const TEST_TITLE = 'VT'
        const TEST_AXIS = 'RANGE_0'
        const prefix = VERTICAL_AXIS_TITLE_PREFIX

        // opens Options -> Axes
        openOptionsModal(OPTIONS_TAB_AXES)

        // sets vertical axis title to "${TEST_TITLE}"
        setAxisTitleTextModeTo('Custom')
        setAxisTitleText(TEST_AXIS, TEST_TITLE)

        setFontStyleOptions({
            fontSize: TEST_FONT_SIZE_OPTION.input,
            textAlign: TEST_TEXT_ALIGN_OPTION.input,
            bold: TEST_BOLD_OPTION.input,
            italic: TEST_ITALIC_OPTION.input,
            color: TEST_COLOR,
            prefix,
        })
        // clicks the modal update button
        clickOptionsModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // config has font size "${TEST_FONT_SIZE_OPTION.output}",
        // text align ${TEST_TEXT_ALIGN_OPTION.output},
        // bold ${TEST_BOLD_OPTION.input},
        // italic ${TEST_ITALIC_OPTION.input},
        // color ${TEST_COLOR}
        expectWindowConfigAxisTitleToBeValue('yAxis', 0, {
            ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE,
            text: TEST_TITLE,
            align: TEST_TEXT_ALIGN_OPTION.output,
            style: {
                ...CONFIG_DEFAULT_VERTICAL_AXIS_TITLE.style,
                fontSize: TEST_FONT_SIZE_OPTION.output,
                fontWeight: TEST_BOLD_OPTION.output,
                fontStyle: TEST_ITALIC_OPTION.output,
                color: TEST_COLOR,
            },
        })
    })
})

/* TODO:    Add tests for all axes based options for Scatter
            Add tests for regression lines and vertical axis labels for Gauge
            Add tests for axes based options for a vertical type (e.g. Bar)
*/
