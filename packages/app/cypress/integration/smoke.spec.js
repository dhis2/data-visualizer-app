import FileMenu from '../elements/FileMenu';
import DimensionPanel from '../elements/DimensionPanel';
import { chartTitleEl, chartContainer } from '../elements/Canvas';

describe('Data visualizer', function() {
    let fileMenu;
    before(() => {
        cy.login();
        cy.loadPage();

        fileMenu = new FileMenu();
    });
    beforeEach(() => {});

    it('loads', () => {
        cy.title().should('equal', 'Data Visualizer');
    });

    it('opens a chart', () => {
        const chartTitle = 'ANC: 1-3 dropout rate Yearly';

        fileMenu.openFile(chartTitle);

        cy.get(chartTitleEl)
            .should('have.length', 1)
            .should('be.visible')
            .contains(chartTitle);

        cy.get(chartContainer)
            .should('have.length', 1)
            .should('be.visible');
    });

    describe('new chart', () => {
        it('adds a data dimension', () => {
            fileMenu.newFile();

            cy.window()
                .its('store')
                .invoke('getState')
                .its('current')
                .should('be.null');

            cy.get(chartContainer, { log: false, timeout: 10000 })
                .should('not.be.visible')
                .should('have.length', 0);

            const dimensionPanel = new DimensionPanel();
            dimensionPanel.selectDimension('dx');

            dimensionPanel.selectIndicator('sB79w2hiLp8');

            dimensionPanel.clickUpdate();

            cy.get(chartContainer, {
                log: false,
                timeout: 10000,
            }).should('be.visible');

            cy.window()
                .its('store')
                .invoke('getState')
                .its('current')
                .its('columns')
                .should('be.visible')
                .should('have.length', 1);
        });
    });
});
