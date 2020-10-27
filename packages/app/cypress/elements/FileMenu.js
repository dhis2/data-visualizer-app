export const clickFileMenu = () => {
    cy.get('button')
        .contains('File')
        .click()
}

export const openSavedAO = ao => {
    clickFileMenu()
    cy.get('div')
        .contains('Open')
        .click()
    cy.contains(ao).click()
}

export const createNewAO = () => {
    clickFileMenu()
    cy.get('div')
        .contains('New')
        .click()
}
