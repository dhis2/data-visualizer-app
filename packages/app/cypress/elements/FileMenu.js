import { generateRandomChar, generateRandomNumber } from '../utils/random'

/*  FIXME:
    Most of the element selection in this file is quite poor because 
    of the FileMenu being old and still uses MUI.
    This can be refactored to use proper data-test selectors once the new
    FileMenu component is in place.
*/

const menubarEl = 'app-menubar'
const openModalEl = '*[class^="MuiDialogContent"]' // TODO: Add data-test to open modal to target this better
const saveModalEl = '*[class^="MuiDialog-container"]' // TODO: Add data-test to save modal to target this better
const saveModalSaveButtonEl = '[type="submit"]'
const menuItemEl = '*[role="menuitem"]'
// const openModalToolbarEl = '*[class^="MuiToolbar-root"]'
// const createdByYouEl = '[data-value="byme"]'
const openModalItemContainerEl = '*[class^="MuiTableBody"]'

const clickFileMenu = () => {
    cy.getBySel(menubarEl)
        .contains('File')
        .click()
}

const clickOpen = () => {
    cy.get(menuItemEl) // TODO: Change once new FileMenu is in place
        .contains('Open')
        .click()
}

export const openRandomSavedAO = () => {
    clickFileMenu()
    clickOpen()
    searchAOByName(generateRandomChar())
    // eslint-disable-next-line
    cy.wait(500) // FIXME: This is a hack
    /* 
        Without the wait Cypress will race the DOM to update the list of available AOs 
        Hopefully this can be solved once the Open dialog is changed to @dhis2(ui instead)
        One possible solution is to assert that the "1-10 / 287" has reduced the total pages to something smaller
        when the filter has been applied.
    */
    cy.get(openModalEl)
        .find(openModalItemContainerEl)
        .children()
        .eq(generateRandomNumber(0, 9))
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

//     cy.get('@owner').should('contain', 'Created by you')

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
    searchAOByName(name)
    cy.get(openModalEl)
        .contains(name)
        .click()
}

export const createNewAO = () => {
    clickFileMenu()
    cy.get(menuItemEl) // TODO: Change once new FileMenu is in place
        .contains('New')
        .click()
}

export const saveNewAO = (name, description) => {
    clickFileMenu()
    cy.get(menuItemEl)
        .contains('Save')
        .click()
    cy.get(saveModalEl)
        .find('input')
        .type(name)
    cy.get(saveModalEl)
        .find('textarea')
        .eq(2)
        .type(description)
    cy.get(saveModalEl)
        .find(saveModalSaveButtonEl)
        .click()
}
export const saveExisitngAO = () => cy.get('STILL-TODO').should('exist')

export const saveExistingAOAs = (name, description) =>
    saveNewAO(name, description)

const expectButtonButtonToBeDisabled = (buttonName, inverse) => {
    clickFileMenu()
    cy.get(menuItemEl)
        .contains(buttonName)
        .parents('li')
        .invoke('attr', 'class')
        .should(inverse ? 'not.contain' : 'contain', 'disabled')
    cy.get(menuItemEl)
        .contains(buttonName)
        .parents('ul')
        .type('{esc}')
}

// Save as
export const expectSaveAsButtonToBeDisabled = inverse => {
    expectButtonButtonToBeDisabled('Save as...', inverse)
}

export const expectSaveAsButtonToBeEnabled = () =>
    expectSaveAsButtonToBeDisabled(true)

// Rename
export const expectRenameButtonToBeEnabled = () =>
    expectRenameButtonToBeDisabled(true)

export const expectRenameButtonToBeDisabled = inverse => {
    expectButtonButtonToBeDisabled('Rename', inverse)
}

// Translate
export const expectTranslateButtonToBeEnabled = () =>
    expectTranslateButtonToBeDisabled(true)

export const expectTranslateButtonToBeDisabled = inverse => {
    expectButtonButtonToBeDisabled('Translate', inverse)
}

// Share
export const expectShareButtonToBeEnabled = () =>
    expectShareButtonToBeDisabled(true)

export const expectShareButtonToBeDisabled = inverse => {
    expectButtonButtonToBeDisabled('Share', inverse)
}

// Get link
export const expectGetLinkButtonToBeEnabled = () =>
    expectGetLinkButtonToBeDisabled(true)

export const expectGetLinkButtonToBeDisabled = inverse => {
    expectButtonButtonToBeDisabled('Get link', inverse)
}

// Delete
export const expectDeleteButtonToBeDisabled = inverse => {
    expectButtonButtonToBeDisabled('Delete', inverse)
}

export const expectDeleteButtonToBeEnabled = () =>
    expectDeleteButtonToBeDisabled(true)

const searchAOByName = name =>
    cy
        .get(openModalEl)
        .find('*[type="search"]')
        .clear()
        .type(name)
