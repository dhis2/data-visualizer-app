import { clickMenuBarFileButton } from '../menuBar.js'

const deleteModalEl = 'file-menu-delete-modal'
const fileMenuContainerEl = 'file-menu-container'
const fileMenuToggleEl = 'file-menu-toggle'
const fileMenuToggleLayerEl = 'file-menu-toggle-layer'

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

export const closeFileMenuWithClick = () =>
    cy.getBySel(fileMenuToggleLayerEl).click('topLeft')

export const closeFileMenuWithEsc = () =>
    cy.getBySel(fileMenuToggleEl).type('{esc}', { force: true })
// use force as the element that's being typed into is hidden

export const clickFileMenuButton = (buttonName) =>
    cy.getBySel(fileMenuContainerEl).contains(buttonName).click()

export const createNewAO = () => {
    clickMenuBarFileButton()
    cy.getBySel(fileMenuContainerEl).contains(FILE_MENU_BUTTON_NEW).click()
}

export const deleteAO = () => {
    clickMenuBarFileButton()
    cy.getBySel(fileMenuContainerEl).contains(FILE_MENU_BUTTON_DELETE).click()
    cy.getBySel(deleteModalEl)
        .find('button')
        .contains(FILE_MENU_BUTTON_DELETE)
        .click()
}

export const expectFileMenuButtonToBeDisabled = (buttonName, inverse) =>
    cy
        .getBySel(fileMenuContainerEl)
        .contains(buttonName)
        .parents('li')
        .invoke('attr', 'class')
        .should(inverse ? 'not.contain' : 'contain', 'disabled')

export const expectFileMenuButtonToBeEnabled = (buttonName) =>
    expectFileMenuButtonToBeDisabled(buttonName, true)

export { saveNewAO, saveExistingAO, saveAOAs } from './save.js'
export {
    openAOByName,
    openRandomAO,
    openRandomAOCreatedByOthers,
} from './open.js'
