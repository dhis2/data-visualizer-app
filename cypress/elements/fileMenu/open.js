import { generateRandomChar, generateRandomNumber } from '../../utils/random'
import { clickMenuBarFileButton } from '../menuBar'
import { FILE_MENU_BUTTON_OPEN, clickFileMenuButton } from '.'

const openModalEl = 'open-file-dialog-modal'
const openModalFooterEl = '*[class^="MuiTableFooter"]'
const openModalToolbarEl = '*[class^="MuiToolbar-root"]'
const createdByOthersEl = '[data-value=byothers]'
const openModalItemContainerEl = '*[class^="MuiTableBody"]'

const searchAOByName = name =>
    cy.getBySel(openModalEl).find('*[type="search"]').clear().type(name)

const clickRandomAO = () =>
    cy
        .getBySel(openModalEl)
        .find(openModalItemContainerEl)
        .children()
        .eq(generateRandomNumber(0, 8))
        .click()

export const openRandomAO = () => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_OPEN)
    searchAOByName(generateRandomChar())
    // eslint-disable-next-line
    cy.wait(500) // FIXME: This is a hack
    /* 
                Without the wait Cypress will race the DOM to update the list of available AOs 
                Hopefully this can be solved once the Open dialog is changed to @dhis2/ui instead)
            */
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
        .then(() =>
            cy
                .get(createdByOthersEl)
                .click()
                .then(() => {
                    cy.getBySel(openModalEl)
                        .find(openModalFooterEl)
                        .should('contain', '241') // FIXME: This is a hack
                    /* 
                            Without the wait Cypress will race the DOM to update the list of available AOs 
                            Hopefully this can be solved once the Open dialog is changed to @dhis2(ui instead)
                            Otherwise one possible solution is to fetch the amount of AOs (241) from the server before
                            starting the tests
                        */
                    clickRandomAO()
                })
        )
}

export const openAOByName = name => {
    clickMenuBarFileButton()
    clickFileMenuButton(FILE_MENU_BUTTON_OPEN)
    searchAOByName(name)
    cy.getBySel(openModalEl).contains(name).click()
}
