const chartContainer = '.highcharts-container'
const highchartsLegend = '.highcharts-legend'
const unsavedVisualizationTitle = 'Unsaved visualization'
const chartTitle = '[data-test="chart-title"]'

export const expectChartToNotBeVisible = () =>
    cy
        .get(chartContainer, {
            log: false,
            timeout: 10000,
        })
        .should('not.be.visible')
        .should('have.length', 0)

export const expectChartToBeVisible = () =>
    cy
        .get(chartContainer, {
            log: false,
            timeout: 10000,
        })
        .should('be.visible')

export const expectLegendToContainItem = item =>
    cy
        .get(highchartsLegend)
        .should('be.visible')
        .contains(item)

export const expectChartTitleToBeValue = value =>
    cy
        .get(chartTitle)
        .should('have.length', 1)
        .should('be.visible')
        .contains(value)

export const expectChartTitleToBeUnsaved = () =>
    cy
        .get(chartTitle)
        .should('have.length', 1)
        .should('be.visible')
        .contains(unsavedVisualizationTitle)
