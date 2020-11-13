const menubarEl = 'app-menubar'
const updateButton = 'app-menubar-update-button'
const optionsButton = 'app-menubar-options-button'

export const clickMenuBarUpdateButton = () => cy.getBySel(updateButton).click()

export const clickMenuBarFileButton = () => {
    cy.getBySel(menubarEl)
        .contains('File')
        .click()
}

export const clickMenuBarOptionsButton = () =>
    cy.getBySel(optionsButton).click()
