import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    visTypeDisplayNames,
    VIS_TYPE_COLUMN,
    VIS_TYPE_PIVOT_TABLE,
} from '@dhis2/analytics'
import { expectVisualizationToBeVisible } from '../../elements/chart.js'
import {
    selectDataElements,
    clickDimensionModalUpdateButton,
    inputSearchTerm,
    unselectAllItemsByButton,
    selectRelativePeriods,
    unselectItemByDoubleClick,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { expectErrorToContainTitle } from '../../elements/visualizationErrorInfo.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'

const NARRATIVE_ITEM = {
    name: 'Cholera (Deaths < 5 yrs) Narrative',
    content:
        'Cholera is an infection of the small intestine caused by the bacterium Vibrio cholerae.',
}

const REGULAR_ITEM = {
    name: 'All other follow-ups',
    content: '53 666',
}

describe('Visualization error', () => {
    it('displays an error when item is not valid for column chart', () => {
        // navigate to the start page and change vis type to PT
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])

        // select period 'This year'
        openDimension(DIMENSION_ID_PERIOD)
        unselectAllItemsByButton()
        selectRelativePeriods(['This year'], 'Years')
        clickDimensionModalUpdateButton()

        // select a narrative item
        openDimension(DIMENSION_ID_DATA)
        inputSearchTerm('narrative')
        selectDataElements([NARRATIVE_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        // narrative item is displayed correctly
        cy.contains(NARRATIVE_ITEM.content)

        // select a regular item
        openDimension(DIMENSION_ID_DATA)
        selectDataElements([REGULAR_ITEM.name])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        // both items are displayed correctly
        cy.contains(NARRATIVE_ITEM.content)
        cy.contains(REGULAR_ITEM.content)

        // change vis type to Column
        changeVisType(visTypeDisplayNames[VIS_TYPE_COLUMN])

        // regular item is displayed correctly
        cy.contains(REGULAR_ITEM.content)

        // remove the regular item
        openDimension(DIMENSION_ID_DATA)
        unselectItemByDoubleClick(REGULAR_ITEM.name)
        clickDimensionModalUpdateButton()

        // error is shown
        expectErrorToContainTitle('Invalid data type')
    })
})
