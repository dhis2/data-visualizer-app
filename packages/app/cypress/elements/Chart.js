const chartContainerEl = '.highcharts-container'
const highchartsLegendEl = '.highcharts-legend'
const unsavedVisualizationTitleText = 'Unsaved visualization'
const chartTitleEl = '[data-test="chart-title"]'
const chartTitleDirtyEl = '[data-test="chart-title-dirty"]'

export const expectChartToNotBeVisible = () =>
    cy
        .get(chartContainerEl, {
            log: false,
            timeout: 10000,
        })
        .should('not.be.visible')
        .should('have.length', 0)

export const expectChartToBeVisible = () =>
    cy
        .get(chartContainerEl, {
            log: false,
            timeout: 10000,
        })
        .should('be.visible')

export const expectLegendToContainItem = item =>
    cy
        .get(highchartsLegendEl)
        .should('be.visible')
        .contains(item)

export const expectChartTitleToBeValue = value =>
    cy
        .get(chartTitleEl)
        .should('have.length', 1)
        .should('be.visible')
        .contains(value)

export const expectChartTitleToBeUnsaved = () =>
    cy
        .get(chartTitleEl)
        .should('have.length', 1)
        .should('be.visible')
        .contains(unsavedVisualizationTitleText)

export const expectChartTitleToBeDirty = () =>
    cy
        .get(chartTitleDirtyEl)
        .should('have.length', 1)
        .should('be.visible')

export const expectChartTitleToNotBeDirty = () =>
    cy
        .get(chartTitleDirtyEl)
        .should('have.length', 0)
        .should('not.be.visible')
