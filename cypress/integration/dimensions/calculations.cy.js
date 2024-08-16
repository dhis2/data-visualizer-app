import {
    DIMENSION_ID_DATA,
    VIS_TYPE_COLUMN,
    getDisplayNameByVisType,
} from '@dhis2/analytics'
import {
    clickCancelButton,
    clickCheckFormulaButton,
    clickConfirmDeleteButton,
    clickDeleteButton,
    clickNewCalculationButton,
    clickSaveButton,
    expectCalculationsModalToBeVisible,
    expectDimensionsListToHaveLength,
    expectFormulaFieldToContainItem,
    expectFormulaFieldToNotContainItem,
    expectFormulaToBeInvalid,
    expectFormulaToBeValid,
    expectFormulaToNotBeValidated,
    expectSaveButtonToBeDisabled,
    expectSaveButtonToBeEnabled,
    expectSaveButtonToHaveTooltip,
    expectSaveButtonToNotHaveTooltip,
    inputCalculationLabel,
    removeItemFromFormulaFieldByDoubleClick,
    selectItemFromDimensionsListByDoubleClick,
    selectOperatorFromListByDoubleClick,
    typeInNumberField,
} from '../../elements/calculationsModal.js'
import { expectVisualizationToBeVisible } from '../../elements/chart.js'
import { expectAppToNotBeLoading, typeInput } from '../../elements/common.js'
import {
    clickDimensionModalUpdateButton,
    clickEDIEditButton,
    expectDataDimensionModalToBeVisible,
    expectItemToBeSelectable,
    expectItemToBeSelected,
    expectNoDataItemsToBeSelected,
    switchDataTypeTo,
    unselectItemByDoubleClick,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { saveNewAO } from '../../elements/fileMenu/save.js'
import { goToStartPage } from '../../elements/startScreen.js'
import { changeVisType } from '../../elements/visualizationTypeSelector.js'

const PAGE_SIZE = 50
const DATA_ELEMENTS_URL = '**/dataElements?*'
const tooltipContentEl = 'tooltip-content'
const dataChipEl = 'layout-chip-dx'

describe('Calculations', () => {
    beforeEach(() => {
        goToStartPage()
        changeVisType(getDisplayNameByVisType(VIS_TYPE_COLUMN))
    })
    it('initial state loads correctly', () => {
        openDimension(DIMENSION_ID_DATA)
        expectDataDimensionModalToBeVisible()

        cy.intercept('GET', DATA_ELEMENTS_URL).as('request')
        clickNewCalculationButton()
        cy.wait('@request').then(({ request, response }) => {
            expect(request.url).to.contain('page=1')
            expect(response.statusCode).to.eq(200)
            expect(response.body.dataElements.length).to.eq(PAGE_SIZE)
        })
        expectCalculationsModalToBeVisible()

        cy.getBySel('calculation-modal-title').should(
            'contain',
            'Data / New calculation'
        )

        cy.getBySel('data-element-group-select').contains('All groups')

        cy.getBySel('data-element-disaggregation-select').contains(
            'Totals only'
        )

        expectDimensionsListToHaveLength(PAGE_SIZE)
    })
    it('can save, load and delete', () => {
        const date = new Date().toLocaleString()
        const TEST_DATA_ELEMENT = 'ANC 2nd visit'
        const TEST_LABEL = `EDI ${date}`
        const TEST_AO_NAME = `TEST with EDI ${date}`

        // create
        openDimension(DIMENSION_ID_DATA)
        clickNewCalculationButton()
        selectItemFromDimensionsListByDoubleClick(TEST_DATA_ELEMENT)
        expectFormulaFieldToContainItem(TEST_DATA_ELEMENT)
        expectSaveButtonToBeDisabled()
        expectSaveButtonToHaveTooltip('Add a name to save this calculation')
        inputCalculationLabel(TEST_LABEL)
        clickSaveButton()
        expectItemToBeSelected(TEST_LABEL)
        clickEDIEditButton(TEST_LABEL)
        expectFormulaFieldToContainItem(TEST_DATA_ELEMENT)
        clickCancelButton()
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        cy.getBySel(dataChipEl).trigger('mouseover')
        cy.getBySelLike(tooltipContentEl).should('contain', TEST_LABEL)
        cy.getBySel(dataChipEl).trigger('mouseout')

        // save
        saveNewAO(TEST_AO_NAME)
        expectAppToNotBeLoading()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)

        // load
        openDimension(DIMENSION_ID_DATA)
        expectItemToBeSelected(TEST_LABEL)
        clickEDIEditButton(TEST_LABEL)
        expectFormulaFieldToContainItem(TEST_DATA_ELEMENT)

        // delete
        clickDeleteButton()
        clickConfirmDeleteButton()
        expectNoDataItemsToBeSelected()
    })
    it('can search and filter data elements', () => {
        let item
        const expectFirstItemToBe = (name) =>
            cy
                .getBySelLike('dimension-list')
                .findBySelLike('data-element-option')
                .eq(0)
                .contains(name)

        openDimension(DIMENSION_ID_DATA)
        clickNewCalculationButton()

        // initial state
        item = 'ANC 1st visit'
        expectDimensionsListToHaveLength(50)
        expectFirstItemToBe(item)
        selectItemFromDimensionsListByDoubleClick(item)
        expectFormulaFieldToContainItem(item)

        // scroll down to fetch page 2
        cy.getBySelLike('dimension-list')
            .parent()
            .scrollTo('bottom', { duration: 50 }) // using regular Cypress scrolling doesn't trigger the fetch for some reason
        expectDimensionsListToHaveLength(100)
        expectFirstItemToBe(item)
        cy.getBySelLike('dimension-list')
            .findBySelLike('data-element-option')
            .eq(50)
            .contains('Blood pressure monitor, electronic or manual available')

        // search
        typeInput('data-element-search', 'malaria')
        expectDimensionsListToHaveLength(21)
        item = 'IDSR Malaria'
        expectFirstItemToBe(item)
        selectItemFromDimensionsListByDoubleClick(item)
        expectFormulaFieldToContainItem(item)

        // filter by group
        cy.getBySel('data-element-group-select').click()
        cy.getBySelLike('data-element-group-select-option')
            .contains('Malaria')
            .click()
        expectDimensionsListToHaveLength(13)
        item = 'Malaria referrals'
        expectFirstItemToBe(item)
        selectItemFromDimensionsListByDoubleClick(item)
        expectFormulaFieldToContainItem(item)

        // change to details only
        cy.getBySel('data-element-disaggregation-select').click()
        cy.getBySelLike('data-element-disaggregation-select-option')
            .contains('Details only')
            .click()
        expectDimensionsListToHaveLength(50)
        item = 'Malaria referrals 0-4y'
        selectItemFromDimensionsListByDoubleClick(item)
        expectFormulaFieldToContainItem(item)
    })
    it('can add and remove formula items', () => {
        const TEST_DATA_ELEMENTS = [
            'ART enrollment stage 1',
            'ART enrollment stage 2',
            'ART enrollment stage 3',
            'ART enrollment stage 4',
        ]
        const TEST_OPERATORS = ['+', '-', '×', '/', '(', ')', 'Number']

        openDimension(DIMENSION_ID_DATA)
        clickNewCalculationButton()

        // add with double click
        selectItemFromDimensionsListByDoubleClick(TEST_DATA_ELEMENTS[0])
        expectFormulaFieldToContainItem(TEST_DATA_ELEMENTS[0])

        // remove with double click
        removeItemFromFormulaFieldByDoubleClick(TEST_DATA_ELEMENTS[0])
        expectFormulaFieldToNotContainItem(TEST_DATA_ELEMENTS[0])

        // add with double click
        selectItemFromDimensionsListByDoubleClick(TEST_DATA_ELEMENTS[1])
        expectFormulaFieldToContainItem(TEST_DATA_ELEMENTS[1])

        // remove with remove button
        cy.getBySel('formula-field')
            .findBySelLike('formula-item')
            .contains(TEST_DATA_ELEMENTS[1])
            .click()
        cy.getBySel('calculation-modal')
            .find('button')
            .contains('Remove item')
            .click()
        expectFormulaFieldToNotContainItem(TEST_DATA_ELEMENTS[1])

        // TODO: add and reorder with DND

        // add math operators: ( DE1 + DE2 - DE3 ) * DE4 / 10
        selectOperatorFromListByDoubleClick(TEST_OPERATORS[4])
        for (let i = 0; i < 4; i++) {
            selectItemFromDimensionsListByDoubleClick(TEST_DATA_ELEMENTS[i])
            if (i === 2) {
                selectOperatorFromListByDoubleClick(TEST_OPERATORS[5])
            }
            selectOperatorFromListByDoubleClick(TEST_OPERATORS[i])
        }
        selectOperatorFromListByDoubleClick(TEST_OPERATORS[6])
        typeInNumberField(13, 10)

        // validate formula
        clickCheckFormulaButton()
        expectFormulaToBeValid()
    })

    it('validates formulas', () => {
        const saveButtonIsDisabled = () => {
            expectSaveButtonToBeDisabled()
            expectSaveButtonToHaveTooltip(
                'The calculation can only be saved with a valid formula'
            )
        }

        const saveButtonIsEnabled = () => {
            expectSaveButtonToBeEnabled()
            expectSaveButtonToNotHaveTooltip()
        }

        const TEST_LABEL = `EDI ${new Date().toLocaleString()}`
        const TEST_DATA_ELEMENTS = [
            'ART enrollment stage 1',
            'ART enrollment stage 2',
            'ART enrollment stage 3',
        ]
        openDimension(DIMENSION_ID_DATA)
        clickNewCalculationButton()
        inputCalculationLabel(TEST_LABEL)
        expectFormulaToNotBeValidated()
        saveButtonIsEnabled()

        // empty formula - invalid
        clickCheckFormulaButton()
        expectFormulaToBeInvalid(
            'Formula is empty. Add items to the formula from the lists on the left.'
        )
        saveButtonIsDisabled()

        // single data element - valid
        selectItemFromDimensionsListByDoubleClick(TEST_DATA_ELEMENTS[0])
        expectFormulaToNotBeValidated()
        saveButtonIsEnabled()
        clickCheckFormulaButton()
        expectFormulaToBeValid()
        saveButtonIsEnabled()

        // consecutive data elements - invalid
        selectItemFromDimensionsListByDoubleClick(TEST_DATA_ELEMENTS[1])
        expectFormulaToNotBeValidated()
        saveButtonIsEnabled()
        clickCheckFormulaButton()
        expectFormulaToBeInvalid('Consecutive data elements')
        saveButtonIsDisabled()

        // data element, math operator, data element - valid
        removeItemFromFormulaFieldByDoubleClick(TEST_DATA_ELEMENTS[1])
        expectFormulaToNotBeValidated()
        saveButtonIsEnabled()
        selectOperatorFromListByDoubleClick('+')
        selectItemFromDimensionsListByDoubleClick(TEST_DATA_ELEMENTS[1])
        clickCheckFormulaButton()
        expectFormulaToBeValid()
        saveButtonIsEnabled()

        // // consecutive math operators - invalid
        // TODO: currently allowed as negative values needs to be supported, e.g. 10 + -5

        // ends with math operator - invalid
        selectOperatorFromListByDoubleClick('/')
        expectFormulaToNotBeValidated()
        saveButtonIsEnabled()
        clickCheckFormulaButton()
        expectFormulaToBeInvalid('Starts or ends with a math operator')
        saveButtonIsDisabled()

        // missing right parenthesis - invalid
        selectOperatorFromListByDoubleClick('(')
        expectFormulaToNotBeValidated()
        saveButtonIsEnabled()
        selectItemFromDimensionsListByDoubleClick(TEST_DATA_ELEMENTS[2])
        clickCheckFormulaButton()
        expectFormulaToBeInvalid('Missing right parenthesis )')
        saveButtonIsDisabled()

        // both parentheses - valid
        selectOperatorFromListByDoubleClick(')')
        expectFormulaToNotBeValidated()
        saveButtonIsEnabled()
        clickCheckFormulaButton()
        expectFormulaToBeValid()
        saveButtonIsEnabled()

        // missing left parenthesis - invalid
        removeItemFromFormulaFieldByDoubleClick('(')
        expectFormulaToNotBeValidated()
        saveButtonIsEnabled()
        clickCheckFormulaButton()
        expectFormulaToBeInvalid('Missing left parenthesis (')
        saveButtonIsDisabled()
    })
    it('changes persist after saving', () => {
        const getEditedLabel = (label) => label.slice(0, -1) + 'E' // "E" for edited
        const date = new Date().toLocaleString()
        const TEST_DATA_ELEMENTS = ['ANC 1st visit', 'ANC 2nd visit']
        const TEST_LABELS = [`EDI 1 ${date} O`, `EDI 2 ${date} O`] // "O" for original
        const TEST_AO_NAME = `TEST with EDI ${date}`

        // create
        openDimension(DIMENSION_ID_DATA)
        TEST_LABELS.forEach((label, i) => {
            clickNewCalculationButton()
            selectItemFromDimensionsListByDoubleClick(TEST_DATA_ELEMENTS[i])
            inputCalculationLabel(label)
            clickSaveButton()
            expectItemToBeSelected(label)
        })

        // edit
        clickEDIEditButton(TEST_LABELS[0])
        inputCalculationLabel(getEditedLabel(TEST_LABELS[0]))
        clickSaveButton()
        expectItemToBeSelected(getEditedLabel(TEST_LABELS[0]))
        expectItemToBeSelected(TEST_LABELS[1])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        cy.getBySel(dataChipEl).trigger('mouseover')
        cy.getBySelLike(tooltipContentEl).should(
            'contain',
            getEditedLabel(TEST_LABELS[0])
        )
        cy.getBySelLike(tooltipContentEl).should('contain', TEST_LABELS[1])
        cy.getBySel(dataChipEl).trigger('mouseout')

        // reopen and deselect second EDI
        openDimension(DIMENSION_ID_DATA)
        expectItemToBeSelected(getEditedLabel(TEST_LABELS[0]))
        expectItemToBeSelected(TEST_LABELS[1])
        unselectItemByDoubleClick(TEST_LABELS[1])
        clickDimensionModalUpdateButton()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        cy.getBySel(dataChipEl).trigger('mouseover')
        cy.getBySelLike(tooltipContentEl).should(
            'contain',
            getEditedLabel(TEST_LABELS[0])
        )
        cy.getBySelLike(tooltipContentEl).should('not.contain', TEST_LABELS[1])
        cy.getBySel(dataChipEl).trigger('mouseout')

        // save
        saveNewAO(TEST_AO_NAME)
        expectAppToNotBeLoading()
        expectVisualizationToBeVisible(VIS_TYPE_COLUMN)
        cy.getBySel(dataChipEl).trigger('mouseover')
        cy.getBySelLike(tooltipContentEl).should(
            'contain',
            getEditedLabel(TEST_LABELS[0])
        )
        cy.getBySelLike(tooltipContentEl).should('not.contain', TEST_LABELS[1])
        cy.getBySel(dataChipEl).trigger('mouseout')

        // reopen and delete
        openDimension(DIMENSION_ID_DATA)
        expectItemToBeSelected(getEditedLabel(TEST_LABELS[0]))
        switchDataTypeTo('Calculations')
        expectItemToBeSelectable(TEST_LABELS[1])
        clickEDIEditButton(getEditedLabel(TEST_LABELS[0]))
        expectFormulaFieldToContainItem(TEST_DATA_ELEMENTS[0])
        clickDeleteButton()
        clickConfirmDeleteButton()
        clickEDIEditButton(TEST_LABELS[1])
        expectFormulaFieldToContainItem(TEST_DATA_ELEMENTS[1])
        clickDeleteButton()
        clickConfirmDeleteButton()
        expectNoDataItemsToBeSelected()
    })
})
