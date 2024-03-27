import {
    DIMENSION_ID_DATA,
    DIMENSION_ID_ORGUNIT,
    DIMENSION_ID_PERIOD,
    visTypeDisplayNames,
    VIS_TYPE_OUTLIER_TABLE,
    AXIS_ID_COLUMNS,
} from '@dhis2/analytics'
import { expectVisualizationToBeVisible } from '../../elements/chart.js'
import { clearInput, typeInput } from '../../elements/common.js'
import {
    selectDataElements,
    clickDimensionModalHideButton,
    clickDimensionModalUpdateButton,
    expectDataTypeToBe,
    expectDataTypeSelectHelpToContain,
    expectPeriodItemToBeInactive,
    expectPeriodDimensionModalWarningToContain,
    selectRelativePeriods,
    unselectAllItemsByButton,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { deleteAO, saveNewAO } from '../../elements/fileMenu/index.js'
import {
    expectDimensionOnAxisToHaveLockIcon,
    expectDimensionOnAxisToHaveWarningIcon,
    expectDimensionToHaveItemAmount,
} from '../../elements/layout.js'
import {
    clickMenuBarUpdateButton,
    openOptionsModal,
} from '../../elements/menuBar.js'
import {
    clickOptionsTab,
    clickOptionsModalHideButton,
    clickOptionsModalUpdateButton,
    OPTIONS_TAB_DATA,
    OPTIONS_TAB_OUTLIERS,
} from '../../elements/optionsModal/index.js'
import { expectRouteToBeEmpty } from '../../elements/route.js'
import {
    expectErrorToContainTitle,
    expectStartScreenToBeVisible,
    goToStartPage,
} from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'

const TEST_DATA_ELEMENT_NAMES = ['ANC 1st visit', 'ANC 2nd visit']
const TEST_VIS_NAME = `TEST OUTLIER TABLE ${new Date().toLocaleString()}`

const maxResultsEl = 'option-outliers-max-result-input-content'
const NEW_MAX_RESULTS = 11

const detectionMethodEl = 'options-outliers-detection-method'
const NEW_DETECTION_METHOD = 'Z_SCORE'
const newDetectionMethodSelector = `input[value=STANDARD_${NEW_DETECTION_METHOD}]`
const thresholdEl = 'options-outliers-threshold-content'
const NEW_THRESHOLD = 2

describe('using an Outlier table visualization', () => {
    it('navigates to a new Outlier table visualization', () => {
        goToStartPage()
        changeVisType(visTypeDisplayNames[VIS_TYPE_OUTLIER_TABLE])
    })
    it('Data is locked to Columns', () => {
        expectDimensionOnAxisToHaveLockIcon(DIMENSION_ID_DATA, AXIS_ID_COLUMNS)
    })
    it('Period is locked to Columns', () => {
        expectDimensionOnAxisToHaveLockIcon(
            DIMENSION_ID_PERIOD,
            AXIS_ID_COLUMNS
        )
    })
    it('Org unit is locked to Columns', () => {
        expectDimensionOnAxisToHaveLockIcon(
            DIMENSION_ID_ORGUNIT,
            AXIS_ID_COLUMNS
        )
    })
    it('Other dimensions section is disabled', () => {
        cy.getBySel('dimensions-panel-list-dynamic-dimensions')
            .findBySel('dimensions-panel-list-dimension-item')
            .should('not.have.css', 'cursor', 'pointer')
    })
    it('Your dimensions section is disabled', () => {
        cy.getBySel('dimensions-panel-list-non-predefined-dimensions')
            .findBySel('dimensions-panel-list-dimension-item')
            .should('not.have.css', 'cursor', 'pointer')
    })
    it('shows a disabled data type selector with preselected Data elements', () => {
        openDimension(DIMENSION_ID_DATA)
        expectDataTypeToBe('Data elements')
        expectDataTypeSelectHelpToContain(
            'Only Data elements can be used in Outlier table'
        )
        clickDimensionModalHideButton()
    })
    it('shows error if no data element selected', () => {
        clickMenuBarUpdateButton()
        expectErrorToContainTitle('No data selected')
    })
    it('selects 2 data elements', () => {
        openDimension(DIMENSION_ID_DATA)
        selectDataElements(TEST_DATA_ELEMENT_NAMES)
        clickDimensionModalHideButton()
        expectDimensionToHaveItemAmount(DIMENSION_ID_DATA, 2)
    })
    it('shows error if no period is selected', () => {
        openDimension(DIMENSION_ID_PERIOD)
        unselectAllItemsByButton()
        clickDimensionModalUpdateButton()
        expectErrorToContainTitle('No period selected')
    })
    it('adds 2 periods and displays a warning message', () => {
        openDimension(DIMENSION_ID_PERIOD)
        selectRelativePeriods(['Last 12 months', 'This month'], 'Months')
        expectPeriodItemToBeInactive('THIS_MONTH')
        expectPeriodDimensionModalWarningToContain(
            "'Outlier table' is intended to show a single item for this type of dimension. Only the first item will be used and saved."
        )
        clickDimensionModalHideButton()
        expectDimensionOnAxisToHaveWarningIcon(
            DIMENSION_ID_PERIOD,
            AXIS_ID_COLUMNS
        )
    })
    it('shows an outlier table', () => {
        clickMenuBarUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_OUTLIER_TABLE)
    })
    it('has the correct headers in the table', () => {
        const headerLabels = [
            'Data',
            'Category option combination',
            'Period',
            'Organisation unit',
            'Value',
            'Median',
            'Modified Z-score',
            'Median absolute deviation',
            'Min',
            'Max',
        ]

        cy.getBySel('outlier-table')
            .findBySel('table-header')
            .each(($el, index) => {
                expect($el).to.contain(headerLabels[index])
            })
    })
    it('has the correct default number of rows', () => {
        cy.getBySel('outlier-table')
            .findBySel('table-row')
            .should('have.length', 20)
    })
    it('has default sorting on Value descending', () => {
        cy.getBySel('outlier-table')
            .findBySel('table-header')
            .contains('Value')
            .closest('[data-test="table-header"]')
            .find('button')
            .should('have.attr', 'title', 'Sort ascending by Value and update')
    })
    it('can be sorted on a different column', () => {
        cy.getBySel('outlier-table')
            .findBySel('table-header')
            .find('button[title="Sort descending by Min and update"]')
            .click()

        expectVisualizationToBeVisible(VIS_TYPE_OUTLIER_TABLE)

        cy.getBySel('outlier-table')
            .findBySel('table-header')
            .contains('Value')
            .closest('[data-test="table-header"]')
            .find('button')
            .should('have.attr', 'title', 'Sort descending by Value and update')

        cy.getBySel('outlier-table')
            .findBySel('table-header')
            .contains('Min')
            .closest('[data-test="table-header"]')
            .find('button')
            .should('have.attr', 'title', 'Sort ascending by Min and update')
    })
    it('Options -> Data -> change max results', () => {
        openOptionsModal(OPTIONS_TAB_DATA)

        cy.intercept('GET', '**/analytics/outlierDetection?*').as(
            'analyticsRequest'
        )

        // NB. typing the 1st 2 digits of the number is a workaround since it's not possible to directly input the whole number without clearing first
        // and when clearing the validation sets the value to 1 (the minimum allowed value)

        // min value is 1
        clearInput(maxResultsEl)
        cy.getBySel(maxResultsEl).find('input').should('have.value', 1)

        // max value is 500
        typeInput('option-outliers-max-result-input-content', 50)
        cy.getBySel(maxResultsEl).find('input').should('have.value', 500)

        clearInput(maxResultsEl)
        typeInput('option-outliers-max-result-input-content', 1)
        cy.getBySel(maxResultsEl)
            .find('input')
            .should('have.value', NEW_MAX_RESULTS)

        clickOptionsModalUpdateButton()

        cy.wait('@analyticsRequest').then(({ request, response }) => {
            expect(request.url).to.contain(`maxResults=${NEW_MAX_RESULTS}`)
            expect(response.body.rows.length).to.eq(NEW_MAX_RESULTS)
        })

        expectVisualizationToBeVisible(VIS_TYPE_OUTLIER_TABLE)

        cy.getBySel('outlier-table')
            .findBySel('table-row')
            .should('have.length', NEW_MAX_RESULTS)
    })
    it('Options -> Outliers -> change detection method', () => {
        openOptionsModal(OPTIONS_TAB_OUTLIERS)

        cy.intercept('GET', '**/analytics/outlierDetection?*').as(
            'analyticsRequest'
        )

        cy.getBySel(detectionMethodEl).find(newDetectionMethodSelector).click()

        cy.getBySel(detectionMethodEl)
            .find(newDetectionMethodSelector)
            .should('be.checked')

        clickOptionsModalUpdateButton()

        cy.wait('@analyticsRequest').then(({ request, response }) => {
            expect(request.url).to.contain(`algorithm=${NEW_DETECTION_METHOD}`)
            expect(response.body.metaData.algorithm).to.eq(NEW_DETECTION_METHOD)
        })

        expectVisualizationToBeVisible(VIS_TYPE_OUTLIER_TABLE)

        const headerLabels = [
            'Data',
            'Category option combination',
            'Period',
            'Organisation unit',
            'Value',
            'Mean',
            'Z-score',
            'Standard deviation',
            'Min',
            'Max',
        ]

        cy.getBySel('outlier-table')
            .findBySel('table-header')
            .each(($el, index) => {
                expect($el).to.contain(headerLabels[index])
            })
    })
    it('Options -> Outliers -> change threshold', () => {
        openOptionsModal(OPTIONS_TAB_OUTLIERS)

        cy.intercept('GET', '**/analytics/outlierDetection?*').as(
            'analyticsRequest'
        )

        clearInput(thresholdEl)
        typeInput(thresholdEl, NEW_THRESHOLD)

        cy.getBySel(thresholdEl)
            .find('input')
            .should('have.value', NEW_THRESHOLD)

        clickOptionsModalUpdateButton()

        cy.wait('@analyticsRequest').then(({ request, response }) => {
            expect(request.url).to.contain(`threshold=${NEW_THRESHOLD}`)
            expect(response.body.metaData.threshold).to.eq(NEW_THRESHOLD)
        })

        expectVisualizationToBeVisible(VIS_TYPE_OUTLIER_TABLE)
    })
    it('shows a custom error screen if no data returned', () => {
        openOptionsModal(OPTIONS_TAB_OUTLIERS)

        clearInput(thresholdEl)
        typeInput(thresholdEl, 10)

        clickOptionsModalUpdateButton()

        expectErrorToContainTitle('No outliers found')

        // reset before save
        openOptionsModal(OPTIONS_TAB_OUTLIERS)
        clearInput(thresholdEl)
        typeInput(thresholdEl, NEW_THRESHOLD)

        clickOptionsModalUpdateButton()

        expectVisualizationToBeVisible(VIS_TYPE_OUTLIER_TABLE)
    })
    it('saves and all options are preserved', () => {
        saveNewAO(TEST_VIS_NAME)

        expectVisualizationToBeVisible(VIS_TYPE_OUTLIER_TABLE)

        openOptionsModal(OPTIONS_TAB_DATA)

        cy.getBySel(maxResultsEl)
            .find('input')
            .should('have.value', NEW_MAX_RESULTS)

        clickOptionsTab(OPTIONS_TAB_OUTLIERS)

        cy.getBySel(detectionMethodEl)
            .find(newDetectionMethodSelector)
            .should('be.checked')

        cy.getBySel(thresholdEl)
            .find('input')
            .should('have.value', NEW_THRESHOLD)

        clickOptionsModalHideButton()
    })
    it('deletes saved Outlier table AO', () => {
        deleteAO()
        expectStartScreenToBeVisible()
        expectRouteToBeEmpty()
    })
})
