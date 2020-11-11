//import { createNewAO } from '../elements/FileMenu'
import { openDimension } from '../elements/DimensionsPanel'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
} from '../elements/DimensionModal'
import { expectStartScreenToBeVisible } from '../elements/StartScreen'
import { expectTitleToBeValue } from '../utils/store'
import { expectVisualizationToBeVisible } from '../elements/Chart'
import {
    DIMENSION_ID_DATA,
    FONT_STYLE_VISUALIZATION_TITLE,
    getFontSizeOptions,
    VIS_TYPE_COLUMN,
} from '@dhis2/analytics'
import { TEST_DATA_ELEMENTS } from '../utils/data'
import { CONFIG_DEFAULT_TITLE } from '../utils/config'
import { clickMenuBarOptionsButton } from '../elements/MenuBar'
import {
    changeTitleFontSizeOption,
    clickOptionsModalUpdateButton,
    clickOptionsTab,
    OPTIONS_TAB_STYLE,
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
        it('has default value', () => {
            expectTitleToBeValue(CONFIG_DEFAULT_TITLE)
        })
        it(`opens Options -> ${OPTIONS_TAB_STYLE}`, () => {
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
        })
        it('changes the font size', () => {
            changeTitleFontSizeOption(fontSizeOption.label)
            clickOptionsModalUpdateButton()
        })
        // expect fontsize to match fontSizeOption.value

        // click style tab
        // set new size, position, color, bold, italic for title
        // check the result in the config
    })
})
