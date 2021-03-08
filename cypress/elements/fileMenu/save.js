import {
    clickFileMenuButton,
    FILE_MENU_BUTTON_SAVE_EXISTING,
    FILE_MENU_BUTTON_SAVE_NEW,
    FILE_MENU_BUTTON_SAVEAS,
} from '.'
import { clearInput, typeInput } from '../common'
import { clickMenuBarFileButton } from '../menuBar'

const saveModalNameEl = 'file-menu-saveas-modal-name'
const saveModalDescriptionEl = 'file-menu-saveas-modal-description'
const saveModalSaveButtonEl = 'file-menu-saveas-modal-save'

export const saveNewAO = (name, description) => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_SAVE_NEW)
    clearInput(saveModalNameEl)
    typeInput(saveModalNameEl, name)
    cy.getBySel(saveModalDescriptionEl).find('textarea').type(description)
    cy.getBySel(saveModalSaveButtonEl).click()
}

export const saveExistingAO = () => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_SAVE_EXISTING)
}

export const saveAOAs = (name, description) => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_SAVEAS)
    if (name) {
        clearInput(saveModalNameEl)
        typeInput(saveModalNameEl, name)
    }
    if (description) {
        cy.getBySel(saveModalDescriptionEl)
            .find('textarea')
            .clear()
            .type(description)
    }
    cy.getBySel(saveModalSaveButtonEl).click()
}
