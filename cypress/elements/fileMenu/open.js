import { EXTENDED_TIMEOUT } from '../../support/utils.js'
import { generateRandomChar, generateRandomNumber } from '../../utils/random.js'
import { clickMenuBarFileButton } from '../menuBar.js'
import { FILE_MENU_BUTTON_OPEN, clickFileMenuButton } from './index.js'

const openModalEl = 'open-file-dialog-modal'
const openModalNameFilterEl = 'open-file-dialog-modal-name-filter'
const openModalToolbarEl = '*[class^="MuiToolbar-root"]'
const createdByOthersEl = '[data-value=byothers]'
const openModalItemContainerEl = '*[class^="MuiTableBody"]'

const searchAOByName = (name) => {
    cy.getBySel(openModalNameFilterEl).find('input').clear()
    cy.getBySel(openModalNameFilterEl).find('input').type(name)
}

const clickRandomAO = () =>
    cy
        .getBySel(openModalEl)
        .find(openModalItemContainerEl)
        .children()
        .eq(generateRandomNumber(0, 7))
        .click()

export const openRandomAO = () => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_OPEN)
    searchAOByName(generateRandomChar())
    // Wait for the list to update before clicking a random AO
    cy.getBySel(openModalEl)
        .find(openModalItemContainerEl)
        .children()
        .should('have.length.greaterThan', 0)
    clickRandomAO()
}

export const openRandomAOCreatedByOthers = () => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_OPEN)
    cy.getBySel(openModalEl)
        .find(openModalToolbarEl)
        .eq(0)
        .children()
        .eq(3) // Fourth element is the owners dropdown
        .find('*[class^="MuiSelect-select"]')
        .as('owner')
        .click()
    cy.get(createdByOthersEl).click()
    // Wait for the list to update after switching owner filter
    cy.getBySel(openModalEl)
        .find(openModalItemContainerEl)
        .children()
        .should('have.length.greaterThan', 0)
    clickRandomAO()
}

export const openAOByName = (name) => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_OPEN)
    searchAOByName(name)
    cy.getBySel(openModalEl, EXTENDED_TIMEOUT)
        .contains(name, EXTENDED_TIMEOUT)
        .click()
}
