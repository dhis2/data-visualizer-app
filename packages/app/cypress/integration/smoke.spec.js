describe('Data visualizer', function() {
    before(() => {
        cy.login();
        cy.loadPage();
    });
    beforeEach(() => {});

    it('loads', () => {
        cy.title().should('equal', 'Data Visualizer');
    });
});
