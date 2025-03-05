import {
    visTypeDisplayNames,
    VIS_TYPE_OUTLIER_TABLE,
    DIMENSION_ID_DATA,
} from '@dhis2/analytics'
import {
    expectAOTitleToBeValue,
    expectVisualizationToBeVisible,
} from '../elements/chart.js'
import { selectDataElements } from '../elements/dimensionModal/dataDimension.js'
import { clickDimensionModalHideButton } from '../elements/dimensionModal/index.js'
import { openAOByName } from '../elements/fileMenu/open.js'
import {
    expectDimensionToHaveItemAmount,
    openDimension,
} from '../elements/layout.js'
import { clickMenuBarUpdateButton } from '../elements/menuBar.js'
import { goToStartPage } from '../elements/startScreen.js'
import { changeVisType } from '../elements/visualizationTypeSelector.js'

describe('push-analytics', { testIsolation: true }, () => {
    it(['>=41'], 'has a push-analytics.json file', () => {
        goToStartPage()
        cy.request('push-analytics.json').as('file')

        cy.get('@file').should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('version')
            expect(response.body).to.have.property('showVisualization')
            expect(response.body).to.have.property(
                'triggerDownloadConditionally'
            )
            expect(response.body).to.have.property(
                'obtainDownloadArtifactConditionally'
            )
            expect(response.body).to.have.property('clearVisualization')
        })
    })

    it(
        ['>=41'],
        'can download a file using the instructions in the push-analytics.json for pivot tables',
        () => {
            const pivotTableName = 'ANC: ANC 1 Visits Cumulative Numbers'
            /* Stub window.open to prevent actually opening the HTML+CSS file in
             * a new tab, because Cypress does not handle this well */
            const windowOpenStub = cy.stub().as('open')
            cy.on('window:before:load', (win) => {
                cy.stub(win, 'open').callsFake(windowOpenStub)
            })

            goToStartPage()
            openAOByName(pivotTableName)
            expectAOTitleToBeValue(pivotTableName)
            expectVisualizationToBeVisible('PIVOT_TABLE')

            // Trigger the download from the UI as push-analytics does
            cy.contains('button', 'Download').should('be.enabled').click()
            cy.contains('li', 'HTML (.html)').should('be.visible').click()

            // Assert that window.open was called with correct URL and target
            cy.get('@open').should('have.been.calledOnce')
            cy.get('@open').should((stub) => {
                const urlInstance = stub.getCall(0).args[0]
                const target = stub.getCall(0).args[1]

                expect(urlInstance).to.have.property('pathname')
                expect(urlInstance.pathname).to.satisfy((pathname) =>
                    pathname.endsWith('/analytics.html+css')
                )
                expect(target).to.equal('_blank')
            })
        }
    )
    it(
        ['>=41'],
        'can download a file using the instructions in the push-analytics.json for charts',
        () => {
            const pivotTableName =
                'Nutrition: Malnutrition indicators stacked bar'
            /* Stub window.open to prevent actually opening the image file in
             * a new tab, because Cypress does not handle this well */
            const windowOpenStub = cy.stub().as('open')
            cy.on('window:before:load', (win) => {
                cy.stub(win, 'open').callsFake(windowOpenStub)
            })

            goToStartPage()
            openAOByName(pivotTableName)
            expectAOTitleToBeValue(pivotTableName)
            expectVisualizationToBeVisible()

            // Trigger the download from the UI as push-analytics does
            cy.contains('button', 'Download').should('be.enabled').click()
            cy.contains('li', 'Image (.png)').should('be.visible').click()

            // Assert that window.open was called with correct URL and target
            cy.get('@open').should('have.been.calledOnce')
            cy.get('@open').should((stub) => {
                const urlString = stub.getCall(0).args[0]
                const target = stub.getCall(0).args[1]

                expect(urlString).to.match(
                    /blob:http:\/\/localhost:3000\/[A-za-z0-9]{8}-[A-za-z0-9]{4}-[A-za-z0-9]{4}-[A-z-az0-9]{4}-[A-za-z0-9]{12}/
                )
                expect(target).to.equal('_blank')
            })
        }
    )
    it(
        ['>=41'],
        'can download a file using the instructions in the push-analytics.json for outlier tables',
        () => {
            // For outlier tables push analytics instercepts the response and
            // parses a HTML table from it, so here we just verify that the required
            // response data is present
            cy.intercept({
                pathname: '**/analytics/outlierDetection',
                query: {
                    algorithm: 'MODIFIED_Z_SCORE',
                    displayProperty: 'NAME',
                },
                times: 1,
            }).as('outliersData')

            // There is no saved outlier table so we create one in the test
            goToStartPage()
            changeVisType(visTypeDisplayNames[VIS_TYPE_OUTLIER_TABLE])
            openDimension(DIMENSION_ID_DATA)
            selectDataElements(['ANC 1st visit', 'ANC 2nd visit'])
            clickDimensionModalHideButton()
            expectDimensionToHaveItemAmount(DIMENSION_ID_DATA, 2)
            clickMenuBarUpdateButton()
            expectVisualizationToBeVisible(VIS_TYPE_OUTLIER_TABLE)

            // Assert that the response has the expected headers and rows
            cy.wait('@outliersData')
                .its('response.body')
                .should((body) => {
                    expect(body.headers).to.have.lengthOf(10)
                    expect(body.rows).to.have.lengthOf(20)
                })
        }
    )
})
