//import { createNewAO } from '../elements/FileMenu'
import { openDimension } from '../elements/DimensionsPanel'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../elements/DimensionModal'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import {
    expectStoreConfigSubtitleToBeValue,
    expectStoreConfigTitleToBeValue,
} from '../utils/store'
import { expectVisualizationToBeVisible } from '../elements/Chart'
import {
    DIMENSION_ID_DATA,
    FONT_STYLE_VISUALIZATION_TITLE,
    getFontSizeOptions,
    getTextAlignOptions,
    VIS_TYPE_COLUMN,
    TEXT_ALIGN_LEFT,
    FONT_STYLE_VISUALIZATION_SUBTITLE,
} from '@dhis2/analytics'
import { TEST_DATA_ELEMENTS } from '../utils/data'
import { CONFIG_DEFAULT_SUBTITLE, CONFIG_DEFAULT_TITLE } from '../utils/config'
import { clickMenuBarOptionsButton } from '../elements/MenuBar'
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
} from '../elements/OptionsModal'

const dimensionId = DIMENSION_ID_DATA
const dataElements = TEST_DATA_ELEMENTS.slice(0, 2).map(item => item.name)

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

describe('font styles', () => {
    it('navigates to the start page', () => {
        cy.visit('')
        expectStartScreenToBeVisible()
    })
    it('adds dimensions', () => {
        openDimension(dimensionId)

        selectDataElements(dataElements)

        clickDimensionModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
    })
    describe('title', () => {
        const fontSizeOption = Object.values(
            getFontSizeOptions(FONT_STYLE_VISUALIZATION_TITLE)
        )[0]
        const textAlignOption = Object.values(
            getTextAlignOptions(FONT_STYLE_VISUALIZATION_TITLE, VIS_TYPE_COLUMN)
        ).find(option => option.value === TEXT_ALIGN_LEFT)
        const type = TYPE_TITLE

        it('has default value', () => {
            expectStoreConfigTitleToBeValue(CONFIG_DEFAULT_TITLE)
        })
        it(`opens Options -> ${OPTIONS_TAB_STYLE}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
        })
        it('changes the font size', () => {
            changeFontSizeOption(type, fontSizeOption.label)
        })
        it('changes the font size', () => {
            changeTextAlignOption(type, textAlignOption.label)
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
        it(`config has font size ${fontSizeOption.value}, text align left, bold true, italic true`, () => {
            const updatedTitle = getModifiedStyle({
                originalStyle: CONFIG_DEFAULT_TITLE,
                fontSize: fontSizeOption.value,
                textAlign: 'left',
                isBold: true,
                isItalic: true,
            })
            expectStoreConfigTitleToBeValue(updatedTitle)
        })
    })
    describe('subtitle', () => {
        const fontSizeOption = Object.values(
            getFontSizeOptions(FONT_STYLE_VISUALIZATION_SUBTITLE)
        )[0]
        const textAlignOption = Object.values(
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
        it(`opens Options -> ${OPTIONS_TAB_STYLE}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
        })
        it('sets a custom subtitle', () => {
            setCustomSubtitle(TEST_SUBTITLE_TEXT)
        })
        it('changes the font size', () => {
            changeFontSizeOption(type, fontSizeOption.label)
        })
        it('changes the font size', () => {
            changeTextAlignOption(type, textAlignOption.label)
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
        it(`config has font size ${fontSizeOption.value}, text align left, bold true, italic true`, () => {
            const updatedSubtitle = getModifiedStyle({
                originalStyle: CONFIG_DEFAULT_SUBTITLE,
                fontSize: fontSizeOption.value,
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
