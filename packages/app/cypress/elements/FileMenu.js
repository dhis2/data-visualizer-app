const clickFileButton = () =>
    cy
        .get('button')
        .contains('File')
        .click()

class FileMenu {
    openFile(fileName) {
        clickFileButton()
        cy.get('div')
            .contains('Open')
            .click()
        cy.contains(fileName).click()
    }

    newFile() {
        clickFileButton()
        cy.get('div')
            .contains('New')
            .click()
    }
}

export default FileMenu
