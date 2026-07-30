import { MAPS_APP_URL } from '../../src/components/VisualizationTypeSelector/VisualizationTypeSelector.jsx'
import { USER_DATASTORE_CURRENT_AO_KEY } from '../../src/modules/currentAnalyticalObject.js'
import {
    expectAOTitleToBeValue,
    expectVisualizationToBeVisible,
} from '../elements/chart.js'
import { openAOByName } from '../elements/fileMenu/open.js'
import { goToStartPage } from '../elements/startScreen.js'
import { clickOpenAsMap } from '../elements/visualizationTypeSelector.js'

describe('open as map', () => {
    it('opens Maps in a new tab instead of navigating away', () => {
        const pivotTableName = 'ANC: ANC 1 Visits Cumulative Numbers'

        /* Stub window.open so Cypress does not actually navigate to the
         * Maps app in a new tab */
        const windowOpenStub = cy.stub().as('open')
        cy.on('window:before:load', (win) => {
            cy.stub(win, 'open').callsFake(windowOpenStub)
        })

        goToStartPage()
        openAOByName(pivotTableName)
        expectAOTitleToBeValue(pivotTableName)
        expectVisualizationToBeVisible('PIVOT_TABLE')

        clickOpenAsMap()

        cy.get('@open').should('have.been.calledOnce')
        cy.get('@open').should((stub) => {
            const url = stub.getCall(0).args[0]
            const target = stub.getCall(0).args[1]
            const features = stub.getCall(0).args[2]

            expect(url).to.satisfy((url) =>
                url.endsWith(
                    `/${MAPS_APP_URL}/#/${USER_DATASTORE_CURRENT_AO_KEY}`
                )
            )
            expect(target).to.equal('_blank')
            expect(features).to.equal('noopener')
        })
    })
})
