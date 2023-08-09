export const menubarEl = 'dhis2-analytics-hovermenubar'
const updateButton = 'app-menubar-update-button'
const optionsButton = 'app-menubar-options-button'

export const clickMenuBarUpdateButton = () => cy.getBySel(updateButton).click()

export const clickMenuBarFileButton = () =>
    cy.getBySel(menubarEl).contains('File').click()

export function clickMenuBarOptionsButton() {
    return cy.getBySel(optionsButton).click()
}

export const openOptionsModal = (section = 'Data') => {
    clickMenuBarOptionsButton()
    return cy.getBySel('options-menu-list').contains(section).click()
}
