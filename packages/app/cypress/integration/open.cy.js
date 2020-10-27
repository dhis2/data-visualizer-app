import { openSavedAO } from '../elements/FileMenu'
import { chartTitleEl, chartContainer } from '../elements/Canvas'

describe('open', () => {
    it('loads a saved AO', () => {
        const chartTitle = 'ANC: 1-3 dropout rate Yearly'

        openSavedAO(chartTitle)

        cy.get(chartTitleEl)
            .should('have.length', 1)
            .should('be.visible')
            .contains(chartTitle)

        cy.get(chartContainer)
            .should('have.length', 1)
            .should('be.visible')
    })
})
