import {
    DIMENSION_ID_DATA,
    FONT_STYLE_VISUALIZATION_TITLE,
    getFontSizeOptions,
    getTextAlignOptions,
    VIS_TYPE_COLUMN,
    TEXT_ALIGN_LEFT,
    FONT_STYLE_VISUALIZATION_SUBTITLE,
} from '@dhis2/analytics'

import { openDimension } from '../../elements/DimensionsPanel'
//import { createNewAO } from '../../elements/FileMenu'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../../elements/DimensionModal'
import { goToStartPage } from '../../elements/StartScreen'
import {
    expectStoreConfigSubtitleToBeValue,
    expectStoreConfigTitleToBeValue,
} from '../../utils/store'
import { expectVisualizationToBeVisible } from '../../elements/Chart'
import { TEST_DATA_ELEMENTS } from '../../utils/data'
import {
    CONFIG_DEFAULT_SUBTITLE,
    CONFIG_DEFAULT_TITLE,
} from '../../utils/config'
import { clickMenuBarOptionsButton } from '../../elements/MenuBar'
import {
    changeFontSizeOption,
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    OPTIONS_TAB_STYLE,
    changeTextAlignOption,
    clickBoldButton,
    clickItalicButton,
    TYPE_TITLE,
    TYPE_SUBTITLE,
    setCustomSubtitle,
} from '../../elements/OptionsModal'
import { getRandomArrayItem } from '../../utils/random'

const TEST_DATA_ELEMENT_NAME = getRandomArrayItem(TEST_DATA_ELEMENTS).name

const getModifiedStyle = ({
    originalStyle,
    textAlign,
    fontSize,
    isBold,
    isItalic,
    text,
}) => {
    const modifiedStyle = {
        ...originalStyle,
    }
    if (textAlign) {
        modifiedStyle.align = textAlign
    }
    if (fontSize) {
        modifiedStyle.style.fontSize = `${fontSize}px`
    }
    if (isBold) {
        modifiedStyle.style.fontWeight = 'bold'
    }
    if (isItalic) {
        modifiedStyle.style.fontStyle = 'italic'
    }
    if (text) {
        modifiedStyle.text = text
    }
    return modifiedStyle
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
        const TEST_FONT_SIZE_OPTION = Object.values(
            getFontSizeOptions(FONT_STYLE_VISUALIZATION_TITLE)
        )[0]
        const TEST_TEXT_ALIGN_OPTION = Object.values(
            getTextAlignOptions(FONT_STYLE_VISUALIZATION_TITLE, VIS_TYPE_COLUMN)
        ).find(option => option.value === TEXT_ALIGN_LEFT)
        const type = TYPE_TITLE

        it('has default value', () => {
            expectStoreConfigTitleToBeValue(CONFIG_DEFAULT_TITLE)
        })
        it('opens Options -> Style', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
        })
        it('changes the font size', () => {
            changeFontSizeOption(type, TEST_FONT_SIZE_OPTION.label)
        })
        it('changes the font size', () => {
            changeTextAlignOption(type, TEST_TEXT_ALIGN_OPTION.label)
        })
        it('changes font to bold', () => {
            clickBoldButton(type)
        })
        it('changes font to italic', () => {
            clickItalicButton(type)
        })
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has font size ${TEST_FONT_SIZE_OPTION.value}, text align left, bold true, italic true`, () => {
            const updatedTitle = getModifiedStyle({
                originalStyle: CONFIG_DEFAULT_TITLE,
                fontSize: TEST_FONT_SIZE_OPTION.value,
                textAlign: 'left',
                isBold: true,
                isItalic: true,
            })
            expectStoreConfigTitleToBeValue(updatedTitle)
        })
    })
    describe('subtitle', () => {
        const TEST_FONT_SIZE_OPTION = Object.values(
            getFontSizeOptions(FONT_STYLE_VISUALIZATION_SUBTITLE)
        )[0]
        const TEST_TEXT_ALIGN_OPTION = Object.values(
            getTextAlignOptions(
                FONT_STYLE_VISUALIZATION_SUBTITLE,
                VIS_TYPE_COLUMN
            )
        ).find(option => option.value === TEXT_ALIGN_LEFT)
        const type = TYPE_SUBTITLE
        const TEST_SUBTITLE_TEXT = 'Test subtitle'

        it('has default value', () => {
            expectStoreConfigSubtitleToBeValue(CONFIG_DEFAULT_SUBTITLE)
        })
        it('opens Options -> Style', () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
        })
        it('sets a custom subtitle', () => {
            setCustomSubtitle(TEST_SUBTITLE_TEXT)
        })
        it('changes the font size', () => {
            changeFontSizeOption(type, TEST_FONT_SIZE_OPTION.label)
        })
        it('changes the font size', () => {
            changeTextAlignOption(type, TEST_TEXT_ALIGN_OPTION.label)
        })
        it('changes font to bold', () => {
            clickBoldButton(type)
        })
        it('changes font to italic', () => {
            clickItalicButton(type)
        })
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has font size ${TEST_FONT_SIZE_OPTION.value}, text align left, bold true, italic true`, () => {
            const updatedSubtitle = getModifiedStyle({
                originalStyle: CONFIG_DEFAULT_SUBTITLE,
                fontSize: TEST_FONT_SIZE_OPTION.value,
                textAlign: 'left',
                isBold: true,
                isItalic: true,
                text: TEST_SUBTITLE_TEXT,
            })
            expectStoreConfigSubtitleToBeValue(updatedSubtitle)
        })
    })
    /*  TODO: 
        legend key
        target line
        base line
        vertical axis title
        vertical labels
        horizontal axis title
        horizontal labels
    */
})
