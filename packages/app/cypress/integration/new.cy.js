import { createNewAO } from '../elements/FileMenu'
import {
    selectDimension,
    selectIndicator,
    clickUpdate,
} from '../elements/Dimensions'
import { chartContainer } from '../elements/Canvas'

describe('new AO', () => {
    it('adds a data dimension', () => {
        createNewAO()

        cy.getReduxState('current').should('be.null')

        cy.get(chartContainer, {
            log: false,
            timeout: 10000,
        })
            .should('not.be.visible')
            .should('have.length', 0)

        selectDimension('dx')
        selectIndicator('sB79w2hiLp8') //ANC 3 Coverage
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
