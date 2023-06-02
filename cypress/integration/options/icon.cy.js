import {
    DIMENSION_ID_DATA,
    DIMENSION_TYPE_DATA_ELEMENT,
    DIMENSION_TYPE_DATA_SET,
    DIMENSION_TYPE_EVENT_DATA_ITEM,
    DIMENSION_TYPE_INDICATOR,
    DIMENSION_TYPE_PROGRAM_INDICATOR,
    VIS_TYPE_SINGLE_VALUE,
} from '@dhis2/analytics'
import { expectVisualizationToBeVisible } from '../../elements/chart.js'
import { clickCheckbox } from '../../elements/common.js'
import {
    switchDataTypeTo,
    switchGroupTo,
    switchSubGroupTo,
} from '../../elements/dimensionModal/dataDimension.js'
import {
    clickDimensionModalUpdateButton,
    expectDataDimensionModalToBeVisible,
    inputSearchTerm,
    selectItemByDoubleClick,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { clickMenuBarOptionsButton } from '../../elements/menuBar.js'
import {
    OPTIONS_TAB_STYLE,
    clickOptionsModalHideButton,
    clickOptionsTab,
} from '../../elements/optionsModal/index.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'

const expectIconToBeVisible = () => {
    cy.getBySelLike('visualization-icon')
        .should('have.length', 1)
        .and('be.visible')
}

const expectIconToBeHidden = () => {
    cy.getBySelLike('visualization-icon').should('not.exist')
}

const TEST_TYPES = [
    DIMENSION_TYPE_INDICATOR,
    DIMENSION_TYPE_DATA_ELEMENT,
    DIMENSION_TYPE_DATA_SET,
    DIMENSION_TYPE_EVENT_DATA_ITEM,
    DIMENSION_TYPE_PROGRAM_INDICATOR,
]

const TEST_ITEMS = {
    [DIMENSION_TYPE_INDICATOR]: 'ANC 2 Coverage',
    [DIMENSION_TYPE_DATA_ELEMENT]: 'ANC 2nd visit',
    [DIMENSION_TYPE_DATA_SET]: 'Child Health',
    [DIMENSION_TYPE_EVENT_DATA_ITEM]: 'MCH Weight (g)',
    [DIMENSION_TYPE_PROGRAM_INDICATOR]: 'Average weight (g)',
}

describe('Icon', () => {
    beforeEach(() => {
        goToStartPage()
        changeVisType(VIS_TYPE_SINGLE_VALUE)
    })
    it('no icon shows when option is disabled', () => {
        // select a data item
        openDimension(DIMENSION_ID_DATA)
        expectDataDimensionModalToBeVisible()
        inputSearchTerm(TEST_ITEMS[DIMENSION_TYPE_INDICATOR])
        selectItemByDoubleClick(TEST_ITEMS[DIMENSION_TYPE_INDICATOR])
        clickDimensionModalUpdateButton()

        // icon is hidden
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        expectIconToBeHidden()
    })
    TEST_TYPES.forEach((type) => {
        it('icon shows when option is enabled', () => {
            // enable the icon
            clickMenuBarOptionsButton()
            clickOptionsTab(OPTIONS_TAB_STYLE)
            clickCheckbox('option-show-data-item-icon')
            clickOptionsModalHideButton()

            // find the data item
            openDimension(DIMENSION_ID_DATA)
            expectDataDimensionModalToBeVisible()
            inputSearchTerm(TEST_ITEMS[type])

            if (type === DIMENSION_TYPE_DATA_SET) {
                switchDataTypeTo('Data sets')
                switchSubGroupTo('Reporting rate')
            } else if (type === DIMENSION_TYPE_EVENT_DATA_ITEM) {
                switchDataTypeTo('Event data items')
                switchGroupTo('Child programme')
            }

            // select the data item
            selectItemByDoubleClick(TEST_ITEMS[type])
            clickDimensionModalUpdateButton()

            // icon is shown
            expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
            expectIconToBeVisible()
        })
    })
})

// TODO:

// icon color matches value color when a legend is set, i.e.
//    1. gets the legend color when legend is set to changes text color
//    2. gets the contrast color when legend is set to changes background color and contrast is applicable
//    3. doesn’t get the legend color when legend is set to changes background color and no contrast is applicable
//    4. all of 3. but for a “filled” icon, (like  :black_square_button: vs :white_square_button:)

/*

ICONS:

Indicator: ANC 2 Coverage - Preg woman, black background
Data element: ANC 2nd visit - Preg woman, outline
Data set: Child Health - Preg woman, filled
Event data items: Child Programme MCH Weight (g) - Scale, filled
Program indicator: Child Programme Average weight - Scale, outline

*/
