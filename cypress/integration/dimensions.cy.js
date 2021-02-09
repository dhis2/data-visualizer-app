import { DIMENSION_ID_DATA } from '@dhis2/analytics'
import { expectDimensionModalToContain } from '../elements/dimensionModal'

import {
    clickUnselectedItem,
    clickSelectedItem,
    expectDataDimensionModalToBeVisible,
    expectDataItemToBeSelected,
    expectDataTypeToBe,
    expectGroupSelectToNotBeVisible,
    expectNoDataItemsToBeSelected,
    selectAllDataItems,
    unselectAllDataItems,
    expectDataItemsSelectedAmountToBeLeast,
    expectDataItemToBeSelectable,
    expectDataItemsSelectableAmountToBeLeast,
} from '../elements/dimensionModal/dataDimension' // TODO: Export in index.js an import from there instead of directly from dataDimension
import { openDimension } from '../elements/dimensionsPanel'
import { goToStartPage } from '../elements/startScreen'
import { TEST_INDICATORS } from '../utils/data'

// Data:
// Data type
// Indicator groups
// Data element groups
// Data element detail
// Data sets
// Event data items programs
// Program indicator programs
// Search
// Select all button
// Deselect all button
// Select one button
// Deselect one button

describe('Data dimension', () => {
    describe('initial state', () => {
        it('navigates to the start page', () => {
            goToStartPage()
        })
        it('opens the data dimension modal', () => {
            cy.intercept('GET', '/dataItems').as('dataItems')
            openDimension(DIMENSION_ID_DATA)
            cy.wait('@dataItems').then(({ request, response }) => {
                expect(request.url).to.contain('page=1')
                expect(response.statusCode).to.eq(302) // FIXME: Backend bug, should be 200
                expect(response.body.dataItems.length).to.eq(50)
            })
            expectDataDimensionModalToBeVisible()
        })
        it('modal has a title', () => {
            expectDimensionModalToContain('Data')
        })
        it('no items are selected', () => {
            expectNoDataItemsToBeSelected()
        })
        it("data type is 'All'", () => {
            expectDataTypeToBe('All')
        })
        it('group select is not visible', () => {
            expectGroupSelectToNotBeVisible()
        })
        const firstPageItemName = TEST_INDICATORS[0].name
        it('an item can be selected', () => {
            clickUnselectedItem(firstPageItemName)
            expectDataItemToBeSelected(firstPageItemName)
        })
        it('an item can be unselected', () => {
            clickSelectedItem(firstPageItemName)
            expectNoDataItemsToBeSelected()
        })
    })
    describe('selecting all and fetching more', () => {
        const secondPageItemName = 'BCG doses'
        it('all items can be selected', () => {
            cy.intercept('GET', '/dataItems').as('dataItems')
            selectAllDataItems()
            expectDataItemsSelectedAmountToBeLeast(50)
            cy.wait('@dataItems').then(({ request, response }) => {
                expect(request.url).to.contain('page=2')
                expect(response.statusCode).to.eq(302) // FIXME: Backend bug, should be 200
                expect(response.body.dataItems.length).to.eq(50)
            })
        })
        it('more items are fetched', () => {
            // TODO: expect /dataItems to have been called
            expectDataItemsSelectableAmountToBeLeast(47) // FIXME: Backend bug, should be 50
            // FIXME: /dataItems returns 3 items from page 1 on page 2, so only 47 new items are added
            expectDataItemToBeSelectable(secondPageItemName)
        })
        it('all items can be unselected', () => {
            unselectAllDataItems()
            expectNoDataItemsToBeSelected()
        })
    })
    describe('selecting Data elements', () => {
        it('', () => {})
    })

    it('', () => {})
    it('', () => {})
    it('', () => {})
    it('', () => {})
    //it('', () => {})
})

/*  TODO:
    Check that each dimension can be opened and that all options can be accessed 
    (especially dropdowns due to the reoccuring bug with duplicates of @dhis2/ui)
   
    Period:
        Relative period type
        Fixed period type
        Fixed period year
        Select all button
        Deselect all button
        Select one button
        Deselect one button
        Reorder buttons

    Dynamic dimensions:
        Search
        Select all button
        Deselect all button
        Select one button
        Deselect one button
        Reorder buttons

    Org unit:
        User org unit / sub-units / sub-x2-units checkboxes
        Checking items in the tree
        Right click tree - "Select all org units below"
        Deselect all button
        Level
        Group
*/
