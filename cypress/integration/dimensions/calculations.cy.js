import { DIMENSION_ID_DATA, VIS_TYPE_COLUMN } from '@dhis2/analytics'
import {
    clickCancelButton,
    clickConfirmDeleteButton,
    clickDeleteButton,
    clickNewCalculationButton,
    clickSaveButton,
    expectCalculationsModalTitleToContain,
    expectCalculationsModalToBeVisible,
    expectDimensionsListToHaveLength,
    expectFormulaFieldToContainItem,
    expectSaveButtonToBeDisabled,
    expectSaveButtonToHaveTooltip,
    inputCalculationLabel,
    selectItemFromDimensionsListByDoubleClick,
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
    /*

        --creating a formula
        double-click to add
        //dnd to add
        add math operators
        remove by selecting and "remove item" button
        remove by double click
        //reorder with DND
        all math operators work and creates a valid formula when used
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
