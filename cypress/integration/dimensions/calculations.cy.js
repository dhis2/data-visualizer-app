import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'
import {
    clickCancelButton,
    clickCheckFormulaButton,
    clickConfirmDeleteButton,
    clickDeleteButton,
    clickNewCalculationButton,
    clickSaveButton,
    expectCalculationsModalTitleToContain,
    expectCalculationsModalToBeVisible,
    expectDimensionsListToHaveLength,
    expectFormulaFieldToContainItem,
    expectFormulaFieldToNotContainItem,
    expectFormulaToBeValid,
    expectSaveButtonToBeDisabled,
    expectSaveButtonToHaveTooltip,
    inputCalculationLabel,
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
    expectItemToBeSelected,
    expectNoDataItemsToBeSelected,
} from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { saveNewAO } from '../../elements/fileMenu/save.js'
import { goToStartPage } from '../../elements/startScreen.js'

const PAGE_SIZE = 50
const DATA_ELEMENTS_URL = '**/dataElements?*'

describe('Calculations', () => {
    beforeEach(() => {
        goToStartPage()
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

        expectCalculationsModalTitleToContain('Data / New calculation')

        cy.getBySel('data-element-group-select').contains('All groups')

        cy.getBySel('data-element-disaggregation-select').contains(
            'Totals only'
        )

        expectDimensionsListToHaveLength(PAGE_SIZE)
    })
    it('can save, load and delete', () => {
        const TEST_DATA_ELEMENT = 'ANC 2nd visit'
        const TEST_LABEL = `EDI ${new Date().toLocaleString()}`
        const TEST_AO_NAME = `TEST with EDI ${new Date().toLocaleString()}`

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
        cy.getBySel('layout-chip-dx').trigger('mouseover')
        cy.getBySelLike('tooltip-content').contains(TEST_LABEL)

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
        const expectFirstItemToBe = (name) =>
            cy
                .getBySelLike('dimension-list')
                .findBySelLike('data-element-option')
                .eq(0)
                .contains(name)

        openDimension(DIMENSION_ID_DATA)
        clickNewCalculationButton()
        expectDimensionsListToHaveLength(50)
        expectFirstItemToBe('ANC 1st visit')

        // scroll down to fetch page 2
        cy.getBySelLike('dimension-list')
            .parent()
            .scrollTo('bottom', { duration: 50 }) // using regular Cypress scrolling doesn't trigger the fetch for some reason
        expectDimensionsListToHaveLength(100)
        expectFirstItemToBe('ANC 1st visit')
        cy.getBySelLike('dimension-list')
            .findBySelLike('data-element-option')
            .eq(50)
            .contains('Blood pressure monitor, electronic or manual available')

        // search
        typeInput('data-element-search', 'malaria')
        expectDimensionsListToHaveLength(21)
        expectFirstItemToBe('IDSR Malaria')

        // filter by group
        cy.getBySel('data-element-group-select').click()
        cy.getBySelLike('data-element-group-select-option')
            .contains('Malaria')
            .click()
        expectDimensionsListToHaveLength(13)
        expectFirstItemToBe('Malaria referrals')

        // change to details only
        cy.getBySel('data-element-disaggregation-select').click()
        cy.getBySelLike('data-element-disaggregation-select-option')
            .contains('Details only')
            .click()
        expectDimensionsListToHaveLength(50)
        expectFirstItemToBe('Malaria referrals 0-4y')
    })

    it.only('can add and remove formula items', () => {
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
        cy.getBySel('formula-field')
            .findBySelLike('formula-item')
            .contains(TEST_DATA_ELEMENTS[0])
            .dblclick()
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
    /*

        --creating a formula
        dataElements (Totals only) show correct name when added
        dataElementOperands (Details only) show correct name when added
        
        --frontend validation / "Check formula"
        "Empty formula"
        "Consecutive math operators"
        "Consecutive data elements"
        "Starts or ends with a math operator"
        "Missing right parenthesis )"
        "Missing left parenthesis ("
        "Valid"
        sample test formula from request to validation (note that detailed tests are already done in Jest)
        changing the formula resets the status
        EDI can't be saved without a valid formula (check with Joe if this is still valid)

        --opening a saved formula
        unselected formula is listed under "Data Type: Calculations"
            has label and formula when opened
        selected formula is selected and not listed under "Data Type: Calculations"
            has label and formula when opened
        editing and saving works
            edited name shows in list of data items
            edited EDI displays correctly in visualization

        */
})
