import { openSavedAO } from '../elements/FileMenu'
import { chartTitle, chartContainer } from '../elements/Canvas'

describe('open', () => {
    it('loads a saved AO', () => {
        const title = 'ANC: 1-3 dropout rate Yearly'

        openSavedAO(title)

        cy.get(chartTitle)
            .should('have.length', 1)
            .should('be.visible')
            .contains(title)

        cy.get(chartContainer)
            .should('have.length', 1)
            .should('be.visible')
    })
})
