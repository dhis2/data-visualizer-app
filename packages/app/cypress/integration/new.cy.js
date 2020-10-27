import { createNewAO } from '../elements/FileMenu'
import { selectDimension } from '../elements/DimensionsPanel'
import { selectIndicator, clickUpdate } from '../elements/DimensionsModal'
import { chartContainer } from '../elements/Canvas'

describe('new AO', () => {
    it('adds a data dimension', () => {
        const dimensionName = 'Data'
        const indicatorName = 'ANC 3 Coverage'

        createNewAO()

        cy.getReduxState('current').should('be.null')

        cy.get(chartContainer, {
            log: false,
            timeout: 10000,
        })
            .should('not.be.visible')
            .should('have.length', 0)

        selectDimension(dimensionName)
        selectIndicator(indicatorName)
        clickUpdate()

        cy.get(chartContainer, {
            log: false,
            timeout: 10000,
        }).should('be.visible')

        cy.getReduxState('current')
            .its('columns')
            .should('have.length', 1)
    })
})
