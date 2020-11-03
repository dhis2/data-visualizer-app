import {
    expectChartTitleToBeValue,
    expectVisualizationToBeVisible,
} from './Chart'
import { expectVisTypeToBeValue } from './VisualizationTypeSelector'

const menubarEl = 'app-menubar'
const openModalEl = '*[class^="MuiDialogContent"]' // TODO: Add data-test to FileMenu to target this better
const openModalToolbarEl = '*[class^="MuiToolbar-root"]'
const createdByYouEl = '[data-value="byme"]'
const openModalItemContainerEl = '*[class^="MuiTableBody"]'

const clickFileMenu = () => {
    cy.getBySel(menubarEl)
        .contains('File')
        .click()
}

const clickOpen = () => {
    cy.get('div') // TODO: Change once new FileMenu is in place
        .contains('Open')
        .click()
}

// export const openRandomSavedAOCreatedByYou = () => {
//     clickFileMenu()
//     clickOpen()
//     cy.get(openModalEl)
//         .find(openModalToolbarEl)
//         .eq(0)
//         .children()
//         .eq(3) // Fourth element is the owners dropdown
//         .find('*[class^="MuiSelect-select"]')
//         .as('owner')
//         .click()
//     cy.get(createdByYouEl).click()

//     cy.get('@owner').should(elem => {
//         expect(elem.text()).to.equal('Created by you')
//     })

//     // eslint-disable-next-line
//     cy.wait(500) // FIXME: This is a hack
//     /*
//         Without the wait Cypress will race the DOM to update the list of available AOs
//         Hopefully this can be solved once the Open dialog is changed to @dhis2(ui instead)
//         One possible solution is to assert that the "1-10 / 287" has reduced the total pages to something smaller
//         when the filter has been applied.
//     */

//     clickRandomSavedAO()
// }

export const openSavedAOByName = name => {
    clickFileMenu()
    clickOpen()
    // FIXME: Add step to search for AO using the search field
    cy.get(openModalEl)
        .contains(name)
        .click()
}

export const createNewAO = () => {
    clickFileMenu()
    cy.get('div') // TODO: Change once new FileMenu is in place
        .contains('New')
        .click()
}
