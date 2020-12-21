import {
    clickFileMenuButton,
    FILE_MENU_BUTTON_SAVE,
    FILE_MENU_BUTTON_SAVEAS,
} from '.'
import { clickMenuBarFileButton } from '../menuBar'

const saveModalEl = '*[class^="MuiDialog-container"]' // TODO: Add data-test to save modal to target this better
const saveModalSaveButtonEl = '[type="submit"]'

export const saveNewAO = (name, description) => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_SAVE)
    cy.get(saveModalEl).find('input').clear().type(name)
    cy.get(saveModalEl).find('textarea').eq(2).type(description)
    cy.get(saveModalEl).find(saveModalSaveButtonEl).click()
}

export const saveExistingAO = () => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_SAVE)
}

export const saveAOAs = (name, description) => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_SAVEAS)
    if (name) {
        cy.get(saveModalEl).find('input').clear().type(name)
    }
    if (description) {
        cy.get(saveModalEl).find('textarea').eq(2).clear().type(description)
    }
    cy.get(saveModalEl).find(saveModalSaveButtonEl).click()
}
