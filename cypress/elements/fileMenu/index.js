/*  FIXME:
    Most of the element selection in this file is quite poor because 
    of the FileMenu being old and still uses MUI.
    This can be refactored to use proper data-test selectors once the new
    FileMenu component is in place.
*/

import { clickMenuBarFileButton } from '../menuBar'

const deleteModalEl = '*[class^="MuiDialog-container"]'
const fileMenuItemEl = '*[role="menuitem"]'

export const FILE_MENU_BUTTON_NEW = 'New'
export const FILE_MENU_BUTTON_OPEN = 'Open'
export const FILE_MENU_BUTTON_SAVE = 'Save'
export const FILE_MENU_BUTTON_SAVEAS = 'Save as...'
export const FILE_MENU_BUTTON_RENAME = 'Rename'
export const FILE_MENU_BUTTON_TRANSLATE = 'Translate'
export const FILE_MENU_BUTTON_SHARE = 'Share'
export const FILE_MENU_BUTTON_GETLINK = 'Get link'
export const FILE_MENU_BUTTON_DELETE = 'Delete'

export const closeFileMenu = () =>
    cy
        .get(fileMenuItemEl)
        .contains(FILE_MENU_BUTTON_NEW)
        .parents('ul')
        .type('{esc}')

export const clickFileMenuButton = buttonName =>
    cy
        .get(fileMenuItemEl) // TODO: Change once new FileMenu is in place
        .contains(buttonName)
        .click()

export const createNewAO = () => {
    clickMenuBarFileButton()
    cy.get(fileMenuItemEl) // TODO: Change once new FileMenu is in place
        .contains(FILE_MENU_BUTTON_NEW)
        .click()
}

export const deleteAO = () => {
    clickMenuBarFileButton()
    cy.get(fileMenuItemEl)
        .contains(FILE_MENU_BUTTON_DELETE)
        .click()
    cy.get(deleteModalEl)
        .find('button')
        .contains(FILE_MENU_BUTTON_DELETE)
        .click()
}

export const expectFileMenuButtonToBeDisabled = (buttonName, inverse) =>
    cy
        .get(fileMenuItemEl)
        .contains(buttonName)
        .parents('li')
        .invoke('attr', 'class')
        .should(inverse ? 'not.contain' : 'contain', 'disabled')

export const expectFileMenuButtonToBeEnabled = buttonName =>
    expectFileMenuButtonToBeDisabled(buttonName, true)

export { saveNewAO, saveExistingAO, saveAOAs } from './save'
export { openAOByName, openRandomAO, openRandomAOCreatedByOthers } from './open'
