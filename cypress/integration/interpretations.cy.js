import { VIS_TYPE_BAR } from '@dhis2/analytics'
import {
    expectAOTitleToBeValue,
    expectVisualizationToBeVisible,
} from '../elements/chart.js'
import { openAOByName } from '../elements/fileMenu/index.js'
import { goToStartPage } from '../elements/startScreen.js'

describe('Interpretations', () => {
    it('opens the interpretations modal on a saved AO', () => {
        const ao = {
            name: 'ANC: 1 and 3 coverage Yearly',
            type: VIS_TYPE_BAR,
        }

        // Open the saved AO
        goToStartPage()
        openAOByName(ao.name)
        expectAOTitleToBeValue(ao.name)
        expectVisualizationToBeVisible(ao.type)

        // Open the interpretations panel
        cy.getBySel('dhis2-analytics-interpretationsanddetailstoggler').click()

        cy.getBySel('interpretations-list')
            .find('button')
            .contains('See interpretation')
            .click()

        cy.getBySel('interpretation-modal').should('be.visible')

        cy.get('.highcharts-container').should('be.visible')

        cy.getBySel('interpretation-modal')
            .find('button')
            .contains('Hide interpretation')
            .click()

        cy.getBySel('interpretation-modal').should('not.exist')
    })
})
