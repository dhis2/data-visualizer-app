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
const deleteModalEl = '*[class^="MuiDialog-container"]'
const saveModalSaveButtonEl = '[type="submit"]'
const menuItemEl = '*[role="menuitem"]'
// const openModalToolbarEl = '*[class^="MuiToolbar-root"]'
// const createdByYouEl = '[data-value="byme"]'
const openModalItemContainerEl = '*[class^="MuiTableBody"]'

export const openFileMenu = () => {
    cy.getBySel(menubarEl)
        .contains('File')
        .click()
}

export const closeFileMenu = () => {
    cy.get(menuItemEl)
        .contains('New')
        .parents('ul')
        .type('{esc}')
}

const clickOpen = () => {
    cy.get(menuItemEl) // TODO: Change once new FileMenu is in place
        .contains('Open')
        .click()
}

export const openRandomSavedAO = () => {
    openFileMenu()
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
//     openFileMenu()
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
    openFileMenu()
    clickOpen()
    searchAOByName(name)
    cy.get(openModalEl)
        .contains(name)
        .click()
}

export const createNewAO = () => {
    openFileMenu()
    cy.get(menuItemEl) // TODO: Change once new FileMenu is in place
        .contains('New')
        .click()
}

export const deleteAO = () => {
    openFileMenu()
    cy.get(menuItemEl)
        .contains('Delete')
        .click()
    cy.get(deleteModalEl)
        .find('button')
        .contains('Delete')
        .click()
}

export const saveNewAO = (name, description) => {
    openFileMenu()
    cy.get(menuItemEl)
        .contains('Save')
        .click()
    cy.get(saveModalEl)
        .find('input')
        .clear()
        .type(name)
    cy.get(saveModalEl)
        .find('textarea')
        .eq(2)
        .type(description)
    cy.get(saveModalEl)
        .find(saveModalSaveButtonEl)
        .click()
}
export const saveExistingAO = () => {
    openFileMenu()
    cy.get(menuItemEl)
        .contains('Save')
        .click()
}

export const saveAOAs = (name, description) => {
    openFileMenu()
    cy.get(menuItemEl)
        .contains('Save as...')
        .click()
    if (name) {
        cy.get(saveModalEl)
            .find('input')
            .clear()
            .type(name)
    }
    if (description) {
        cy.get(saveModalEl)
            .find('textarea')
            .eq(2)
            .clear()
            .type(description)
    }
    cy.get(saveModalEl)
        .find(saveModalSaveButtonEl)
        .click()
}

const expectButtonToBeDisabled = (buttonName, inverse) => {
    cy.get(menuItemEl)
        .contains(buttonName)
        .parents('li')
        .invoke('attr', 'class')
        .should(inverse ? 'not.contain' : 'contain', 'disabled')
}

// Save as
export const expectSaveAsButtonToBeDisabled = inverse => {
    expectButtonToBeDisabled('Save as...', inverse)
}

export const expectSaveAsButtonToBeEnabled = () =>
    expectSaveAsButtonToBeDisabled(true)

// Rename
export const expectRenameButtonToBeEnabled = () =>
    expectRenameButtonToBeDisabled(true)

export const expectRenameButtonToBeDisabled = inverse => {
    expectButtonToBeDisabled('Rename', inverse)
}

// Translate
export const expectTranslateButtonToBeEnabled = () =>
    expectTranslateButtonToBeDisabled(true)

export const expectTranslateButtonToBeDisabled = inverse => {
    expectButtonToBeDisabled('Translate', inverse)
}

// Share
export const expectShareButtonToBeEnabled = () =>
    expectShareButtonToBeDisabled(true)

export const expectShareButtonToBeDisabled = inverse => {
    expectButtonToBeDisabled('Share', inverse)
}

// Get link
export const expectGetLinkButtonToBeEnabled = () =>
    expectGetLinkButtonToBeDisabled(true)

export const expectGetLinkButtonToBeDisabled = inverse => {
    expectButtonToBeDisabled('Get link', inverse)
}

// Delete
export const expectDeleteButtonToBeDisabled = inverse => {
    expectButtonToBeDisabled('Delete', inverse)
}

export const expectDeleteButtonToBeEnabled = () =>
    expectDeleteButtonToBeDisabled(true)

const searchAOByName = name =>
    cy
        .get(openModalEl)
        .find('*[type="search"]')
        .clear()
        .type(name)
