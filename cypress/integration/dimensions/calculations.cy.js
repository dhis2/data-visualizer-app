import { DIMENSION_ID_DATA } from '@dhis2/analytics'
import {
    clickNewCalculationButton,
    expectCalculationsModalTitleToContain,
    expectCalculationsModalToBeVisible,
} from '../../elements/calculationsModal.js'
import { expectDataDimensionModalToBeVisible } from '../../elements/dimensionModal/index.js'
import { openDimension } from '../../elements/dimensionsPanel.js'
import { goToStartPage } from '../../elements/startScreen.js'

const PAGE_SIZE = 50
const DATA_ELEMENTS_URL = '**/dataElements?*'

describe('Data dimension', () => {
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

        cy.getBySelLike('dimension-list')
            .children()
            .should('have.length', PAGE_SIZE + 1)
    })

    /*

        --search/filter
        searching
        filtering by group
        changing disaggregation type
        scrolling down and fetching the next page

        --creating a formula
        double-click to add
        //dnd to add
        add math operators
        remove by selecting and "remove item" button
        //remove by double click
        reorder with DND
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

        --saving a formula
        enter a label
        create a valid formula
        validate the formula
        save
        EDI displays correctly in the visualization

        --opening a saved formula
        unselected formula is listed under "Data Type: Calculations"
            tooltip shows on hover
            has label and formula when opened
        selected formula is selected and not listed under "Data Type: Calculations"
            tooltip shows on hover
            has label and formula when opened
        editing and saving works
            edited formula shows in tooltip on hover
            edited name shows in list of data items
            edited EDI displays correctly in visualization

        */
})
