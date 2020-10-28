const openModal = '*[class^="MuiDialogContent"]' // TODO: Add data-test to FileMenu to target this better

export const clickFileMenu = () => {
    cy.get('.toolbar-menubar')
        .contains('File')
        .click()
}

export const openSavedAO = ao => {
    clickFileMenu()
    cy.get('div')
        .contains('Open')
        .click()
    cy.get(openModal)
        .contains(ao)
        .click()
}

export const createNewAO = () => {
    clickFileMenu()
    cy.get('div')
        .contains('New')
        .click()
}
