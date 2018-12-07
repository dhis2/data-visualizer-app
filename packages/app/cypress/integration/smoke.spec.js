import FileMenu from '../elements/FileMenu';
import DimensionPanel from '../elements/DimensionPanel';
import { chartTitleEl, chartVisualizationEl } from '../elements/Canvas';

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

        cy.get(chartVisualizationEl)
            .should('have.length', 1)
            .should('be.visible');
    });

    describe('new chart', () => {
        it('adds a data dimension', () => {
            fileMenu.newFile();

            const dimensionPanel = new DimensionPanel();
            dimensionPanel.selectDimension('dx');
        });
    });
});
