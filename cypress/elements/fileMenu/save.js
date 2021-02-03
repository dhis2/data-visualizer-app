import {
    clickFileMenuButton,
    FILE_MENU_BUTTON_SAVE_EXISTING,
    FILE_MENU_BUTTON_SAVE_NEW,
    FILE_MENU_BUTTON_SAVEAS,
} from '.'
import { clickMenuBarFileButton } from '../menuBar'

const saveModalEl = '[data-test="file-menu-saveas-modal"]'
const saveModalSaveButtonEl = '[data-test="file-menu-saveas-modal-save"]'

export const saveNewAO = (name, description) => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_SAVE_NEW)
    cy.get(saveModalEl).find('input').clear().type(name)
    cy.get(saveModalEl).find('textarea').type(description)
    cy.get(saveModalEl).find(saveModalSaveButtonEl).click()
}

export const saveExistingAO = () => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_SAVE_EXISTING)
}

export const saveAOAs = (name, description) => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_SAVEAS)
    if (name) {
        cy.get(saveModalEl).find('input').clear().type(name)
    }
    if (description) {
        cy.get(saveModalEl).find('textarea').clear().type(description)
    }
    cy.get(saveModalEl).find(saveModalSaveButtonEl).click()
}
