import { clickMenuBarFileButton } from '../menuBar'

const deleteModalEl = '[data-test="file-menu-delete-modal"]'
const fileMenuItemEl = '[data-test="file-menu-container"] li'

export const FILE_MENU_BUTTON_NEW = 'New'
export const FILE_MENU_BUTTON_OPEN = 'Open…'
export const FILE_MENU_BUTTON_SAVE_EXISTING = 'Save'
export const FILE_MENU_BUTTON_SAVE_NEW = 'Save…'
export const FILE_MENU_BUTTON_SAVEAS = 'Save as…'
export const FILE_MENU_BUTTON_RENAME = 'Rename…'
export const FILE_MENU_BUTTON_TRANSLATE = 'Translate…'
export const FILE_MENU_BUTTON_SHARE = 'Share…'
export const FILE_MENU_BUTTON_GETLINK = 'Get link…'
export const FILE_MENU_BUTTON_DELETE = 'Delete'

export const closeFileMenu = () =>
    cy
        .get(fileMenuItemEl)
        .contains(FILE_MENU_BUTTON_NEW)
        .type('{esc}', { force: true })

export const clickFileMenuButton = buttonName =>
    cy.get(fileMenuItemEl).contains(buttonName).click()

export const createNewAO = () => {
    clickMenuBarFileButton()
    cy.get(fileMenuItemEl).contains(FILE_MENU_BUTTON_NEW).click()
}

export const deleteAO = () => {
    clickMenuBarFileButton()
    cy.get(fileMenuItemEl).contains(FILE_MENU_BUTTON_DELETE).click()
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
