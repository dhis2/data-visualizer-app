import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_PERIOD,
    VIS_TYPE_PIVOT_TABLE,
    visTypeDisplayNames,
} from '@dhis2/analytics'
import { expectVisualizationToBeVisible } from '../../elements/chart.js'
import { expectAppToNotBeLoading } from '../../elements/common.js'
import {
    selectIndicators,
    clickDimensionModalUpdateButton,
    unselectAllItemsByButton,
    selectFixedPeriods,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import {
    createNewAO,
    deleteAO,
    saveNewAO,
} from '../../elements/fileMenu/index.js'
import { openOptionsModal } from '../../elements/menuBar.js'
import {
    OPTIONS_TAB_LIMIT_VALUES,
    changeMaxOperator,
    changeMinOperator,
    clickOptionsModalHideButton,
    clickOptionsModalUpdateButton,
    expectMaxOperatorToBeOption,
    expectMaxValueToBeValue,
    expectMinOperatorToBeOption,
    expectMinValueToBeValue,
    setMaxValue,
    setMinValue,
} from '../../elements/optionsModal/index.js'
import {
    expectStartScreenToBeVisible,
    goToStartPage,
} from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'

const TEST_INDICATOR = 'ANC visits total'
const currentYear = new Date().getFullYear().toString()
const expectTableValueToBe = (value, position) =>
    cy
        .getBySel('visualization-container')
        .find('tbody')
        .find('tr')
        .eq(position)
        .find('td')
        .invoke('text')
        .invoke('trim')
        .should('equal', value)

describe('limit values', () => {
    beforeEach(() => {
        goToStartPage()
        createNewAO()
        changeVisType(visTypeDisplayNames[VIS_TYPE_PIVOT_TABLE])
        openDimension(DIMENSION_ID_DATA)
        selectIndicators([TEST_INDICATOR])
        clickDimensionModalUpdateButton()
        openDimension(DIMENSION_ID_PERIOD)
        unselectAllItemsByButton()
        selectFixedPeriods(
            [
                `January ${currentYear}`,
                `February ${currentYear}`,
                `March ${currentYear}`,
                `April ${currentYear}`,
                `May ${currentYear}`,
            ],
            'Monthly'
        )
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)

        const expectedValues = [
            '49 231',
            '49 605',
            '49 500',
            '55 385',
            '68 886',
        ]
        expectedValues.forEach((value, index) =>
            expectTableValueToBe(value, index)
        )

        openOptionsModal(OPTIONS_TAB_LIMIT_VALUES)
        expectMinOperatorToBeOption('>')
        expectMaxOperatorToBeOption('<')
        expectMinValueToBeValue('')
        expectMaxValueToBeValue('')
    })
    it('min and max value display correctly', () => {
        // set limits
        changeMinOperator('>=')
        changeMaxOperator('<=')
        setMinValue('49500')
        setMaxValue('55385')
        clickOptionsModalUpdateButton()

        // verify limits are applied
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        const expectedValues = ['', '49 605', '49 500', '55 385', '']
        expectedValues.forEach((value, index) =>
            expectTableValueToBe(value, index)
        )

        // verify options are present when reopening modal
        openOptionsModal(OPTIONS_TAB_LIMIT_VALUES)
        expectMinOperatorToBeOption('>=')
        expectMaxOperatorToBeOption('<=')
        expectMinValueToBeValue('49500')
        expectMaxValueToBeValue('55385')
        clickOptionsModalHideButton()

        // save AO, verify limits are applied
        saveNewAO(`TEST min max ${new Date().toLocaleString()}`)
        expectAppToNotBeLoading()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        expectedValues.forEach((value, index) =>
            expectTableValueToBe(value, index)
        )

        // verify options are present when reopening modal
        openOptionsModal(OPTIONS_TAB_LIMIT_VALUES)
        expectMinOperatorToBeOption('>=')
        expectMaxOperatorToBeOption('<=')
        expectMinValueToBeValue('49500')
        expectMaxValueToBeValue('55385')
        clickOptionsModalHideButton()

        // clean up
        deleteAO()
        expectStartScreenToBeVisible()
    })
    it('min value only display correctly', () => {
        // set limits
        changeMinOperator('>=')
        setMinValue('49500')
        clickOptionsModalUpdateButton()

        // verify limits are applied
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        const expectedValues = ['', '49 605', '49 500', '55 385', '68 886']
        expectedValues.forEach((value, index) =>
            expectTableValueToBe(value, index)
        )

        // verify options are present when reopening modal
        openOptionsModal(OPTIONS_TAB_LIMIT_VALUES)
        expectMinOperatorToBeOption('>=')
        expectMaxOperatorToBeOption('<')
        expectMinValueToBeValue('49500')
        expectMaxValueToBeValue('')
        clickOptionsModalHideButton()

        // save AO, verify limits are applied
        saveNewAO(`TEST min max ${new Date().toLocaleString()}`)
        expectAppToNotBeLoading()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        expectedValues.forEach((value, index) =>
            expectTableValueToBe(value, index)
        )

        // verify options are present when reopening modal
        openOptionsModal(OPTIONS_TAB_LIMIT_VALUES)
        expectMinOperatorToBeOption('>=')
        expectMaxOperatorToBeOption('<')
        expectMinValueToBeValue('49500')
        expectMaxValueToBeValue('')
        clickOptionsModalHideButton()

        // clean up
        deleteAO()
        expectStartScreenToBeVisible()
    })
    it('max value only display correctly', () => {
        // set limits
        changeMaxOperator('<=')
        setMaxValue('55385')
        clickOptionsModalUpdateButton()

        // verify limits are applied
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        const expectedValues = ['49 231', '49 605', '49 500', '55 385', '']
        expectedValues.forEach((value, index) =>
            expectTableValueToBe(value, index)
        )

        // verify options are present when reopening modal
        openOptionsModal(OPTIONS_TAB_LIMIT_VALUES)
        expectMinOperatorToBeOption('>')
        expectMaxOperatorToBeOption('<=')
        expectMinValueToBeValue('')
        expectMaxValueToBeValue('55385')
        clickOptionsModalHideButton()

        // save AO, verify limits are applied
        saveNewAO(`TEST min max ${new Date().toLocaleString()}`)
        expectAppToNotBeLoading()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        expectedValues.forEach((value, index) =>
            expectTableValueToBe(value, index)
        )

        // verify options are present when reopening modal
        openOptionsModal(OPTIONS_TAB_LIMIT_VALUES)
        expectMinOperatorToBeOption('>')
        expectMaxOperatorToBeOption('<=')
        expectMinValueToBeValue('')
        expectMaxValueToBeValue('55385')
        clickOptionsModalHideButton()

        // clean up
        deleteAO()
        expectStartScreenToBeVisible()
    })
    it('equal value display correctly', () => {
        // set limits
        changeMinOperator('=')
        setMinValue('49500')
        clickOptionsModalUpdateButton()

        // verify limits are applied
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        const expectedValues = ['', '', '49 500', '', '']
        expectedValues.forEach((value, index) =>
            expectTableValueToBe(value, index)
        )

        // verify options are present when reopening modal
        openOptionsModal(OPTIONS_TAB_LIMIT_VALUES)
        expectMinOperatorToBeOption('=')
        expectMaxOperatorToBeOption('<')
        expectMinValueToBeValue('49500')
        expectMaxValueToBeValue('')
        clickOptionsModalHideButton()

        // save AO, verify limits are applied
        saveNewAO(`TEST min max ${new Date().toLocaleString()}`)
        expectAppToNotBeLoading()
        expectVisualizationToBeVisible(VIS_TYPE_PIVOT_TABLE)
        expectedValues.forEach((value, index) =>
            expectTableValueToBe(value, index)
        )

        // verify options are present when reopening modal
        openOptionsModal(OPTIONS_TAB_LIMIT_VALUES)
        expectMinOperatorToBeOption('=')
        expectMaxOperatorToBeOption('<')
        expectMinValueToBeValue('49500')
        expectMaxValueToBeValue('')
        clickOptionsModalHideButton()

        // clean up
        deleteAO()
        expectStartScreenToBeVisible()
    })
})
