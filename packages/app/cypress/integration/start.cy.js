describe('start screen', () => {
    it('has title', () => {
        cy.title().should('equal', 'Data Visualizer | DHIS2')
    })
})
