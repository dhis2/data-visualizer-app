//import { createNewAO } from '../elements/FileMenu'
import { openDimension } from '../elements/DimensionsPanel'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../elements/DimensionModal'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import { expectStoreConfigTitleToBeValue } from '../utils/store'
import { expectVisualizationToBeVisible } from '../elements/Chart'
import {
    DIMENSION_ID_DATA,
    FONT_STYLE_VISUALIZATION_TITLE,
    getFontSizeOptions,
    getTextAlignOptions,
    VIS_TYPE_COLUMN,
    TEXT_ALIGN_LEFT,
} from '@dhis2/analytics'
import { TEST_DATA_ELEMENTS } from '../utils/data'
import { CONFIG_DEFAULT_TITLE } from '../utils/config'
import { clickMenuBarOptionsButton } from '../elements/MenuBar'
import {
    changeTitleFontSizeOption,
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    OPTIONS_TAB_STYLE,
    changeTitleTextAlignOption,
} from '../elements/OptionsModal'

const dimensionId = DIMENSION_ID_DATA
const dataElements = TEST_DATA_ELEMENTS.slice(0, 2).map(item => item.name)

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

        it('has default value', () => {
            expectStoreConfigTitleToBeValue(CONFIG_DEFAULT_TITLE)
        })
        it(`opens Options -> ${OPTIONS_TAB_STYLE}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
        })
        it('changes the font size', () => {
            changeTitleFontSizeOption(fontSizeOption.label)
        })
        it('changes the font size', () => {
            changeTitleTextAlignOption(textAlignOption.label)
        })
        it('changes font to bold', () => {
            // TODO: click the bold button
        })
        it('changes font to italic', () => {
            // TODO: click the italic button
        })
        it('click the modal update button', () => {
            clickOptionsModalUpdateButton()
        })
        it(`config has font size ${fontSizeOption.value}, text align left`, () => {
            const updatedTitle = {
                ...CONFIG_DEFAULT_TITLE,
                align: 'left',
                style: {
                    ...CONFIG_DEFAULT_TITLE.style,
                    fontSize: `${fontSizeOption.value}px`,
                    // TODO: add bold and italic
                },
            }
            expectStoreConfigTitleToBeValue(updatedTitle)
        })
    })
})
