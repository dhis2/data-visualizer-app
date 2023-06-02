import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
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
    clickDimensionModalHideButton,
    clickDimensionModalUpdateButton,
    expectDataDimensionModalToBeVisible,
    inputSearchTerm,
    selectItemByDoubleClick,
    selectRelativePeriods,
    unselectAllItemsByButton,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { clickMenuBarOptionsButton } from '../../elements/menuBar.js'
import {
    OPTIONS_TAB_LEGEND,
    OPTIONS_TAB_STYLE,
    clickOptionsModalHideButton,
    clickOptionsModalUpdateButton,
    clickOptionsTab,
} from '../../elements/optionsModal/index.js'
import {
    changeDisplayStrategyToFixed,
    changeDisplayStyleToText,
    changeFixedLegendSet,
    expectSingleValueToHaveIconColor,
    toggleLegend,
} from '../../elements/optionsModal/legend.js'
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
        it(`icon shows when option is enabled for ${type}`, () => {
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
    it('icon gets correct color when a legend is in use', () => {
        // enable the icon
        clickMenuBarOptionsButton()
        clickOptionsTab(OPTIONS_TAB_STYLE)
        clickCheckbox('option-show-data-item-icon')

        // enable the legend
        clickOptionsTab(OPTIONS_TAB_LEGEND)
        toggleLegend()
        changeDisplayStrategyToFixed()
        changeFixedLegendSet('E2E legend')
        clickOptionsModalHideButton()

        // select a period
        openDimension(DIMENSION_ID_PERIOD)
        unselectAllItemsByButton()
        selectRelativePeriods(['This year'], 'Years')
        clickDimensionModalHideButton()

        // select a data item
        openDimension(DIMENSION_ID_DATA)
        expectDataDimensionModalToBeVisible()
        inputSearchTerm(TEST_ITEMS[DIMENSION_TYPE_INDICATOR])
        selectItemByDoubleClick(TEST_ITEMS[DIMENSION_TYPE_INDICATOR])
        clickDimensionModalUpdateButton()

        // default text color is applied to icon
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        expectIconToBeVisible()
        expectSingleValueToHaveIconColor('#212934')

        // switch to use a data item that will trigger the contrast color
        openDimension(DIMENSION_ID_DATA)
        expectDataDimensionModalToBeVisible()
        unselectAllItemsByButton()
        inputSearchTerm(TEST_ITEMS[DIMENSION_TYPE_DATA_ELEMENT])
        selectItemByDoubleClick(TEST_ITEMS[DIMENSION_TYPE_DATA_ELEMENT])
        clickDimensionModalUpdateButton()

        // contrast color is applied to icon
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        expectIconToBeVisible()
        expectSingleValueToHaveIconColor('#2166ac')

        // switch to apply legend to text color
        clickMenuBarOptionsButton()
        clickOptionsTab(OPTIONS_TAB_LEGEND)
        changeDisplayStyleToText()
        clickOptionsModalUpdateButton()

        // legend color is applied to icon
        expectVisualizationToBeVisible(VIS_TYPE_SINGLE_VALUE)
        expectIconToBeVisible()
        expectSingleValueToHaveIconColor('#ffffff')
    })
})
