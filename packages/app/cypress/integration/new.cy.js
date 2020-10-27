import { createNewAO } from '../elements/FileMenu'
import { openDimension } from '../elements/DimensionsPanel'
import { selectIndicator, clickUpdate } from '../elements/DimensionsModal'
import { chartContainer, startScreen } from '../elements/Canvas'
import { startScreenText } from '../elements/Texts'

const dimensionName = 'Data'
const indicatorName = 'ANC 3 Coverage'

describe('new AO', () => {
    it('creates a new AO', () => {
        cy.get(startScreen).contains(startScreenText)
        createNewAO()

        cy.getReduxState('current').should('be.null')

        cy.get(chartContainer, {
            log: false,
            timeout: 10000,
        })
            .should('not.be.visible')
            .should('have.length', 0)

        cy.get(startScreen).contains(startScreenText)

        // TODO: Select another vistype
        // TODO: Make the test dynamic so it can be looped through and run for all vis types

        openDimension(dimensionName)
        selectIndicator(indicatorName)
        clickUpdate()

        cy.get(chartContainer, {
            log: false,
            timeout: 10000,
        }).should('be.visible')

        cy.getReduxState('current')
            .its('columns')
            .should('have.length', 1)

        // TODO: Check that title is 'unsaved visualization'
        // TODO: Check that the chart contains the indicatorName in the highcharts legend (for column etc only)
    })
})
