import FileMenu from '../elements/FileMenu'
import Dimensions from '../elements/Dimensions'
import { chartTitleEl, chartContainer } from '../elements/Canvas'

describe('Data visualizer', () => {
    let fileMenu
    before(() => {
        fileMenu = new FileMenu()
    })

    it('loads', () => {
        cy.visit('') // TODO: Move this to run before each test
        cy.title().should('equal', 'Data Visualizer | DHIS2')
    })

    it('opens a chart', () => {
        const chartTitle = 'ANC: 1-3 dropout rate Yearly'

        fileMenu.openFile(chartTitle)

        cy.get(chartTitleEl)
            .should('have.length', 1)
            .should('be.visible')
            .contains(chartTitle)

        cy.get(chartContainer)
            .should('have.length', 1)
            .should('be.visible')
    })

    describe('new chart', () => {
        it('adds a data dimension', () => {
            fileMenu.newFile()

            cy.getReduxState('current').should('be.null')

            cy.get(chartContainer, {
                log: false,
                timeout: 10000,
            })
                .should('not.be.visible')
                .should('have.length', 0)

            const dimensions = new Dimensions()
            dimensions.selectDimension('dx')
            dimensions.selectIndicator('sB79w2hiLp8') //ANC 3 Coverage
            dimensions.clickUpdate()

            cy.get(chartContainer, {
                log: false,
                timeout: 10000,
            }).should('be.visible')

            cy.getReduxState('current')
                .its('columns')
                .should('have.length', 1)
        })
    })
})
