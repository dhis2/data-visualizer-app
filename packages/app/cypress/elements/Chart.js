import {
    VIS_TYPE_GAUGE,
    VIS_TYPE_PIE,
    VIS_TYPE_PIVOT_TABLE,
    VIS_TYPE_SINGLE_VALUE,
    VIS_TYPE_YEAR_OVER_YEAR_COLUMN,
    VIS_TYPE_YEAR_OVER_YEAR_LINE,
} from '@dhis2/analytics'

const visualizationContainerEl = 'visualization-container'
const visualizationTitleEl = 'visualization-title'
const chartContainerEl = '.highcharts-container'
const highchartsLegendEl = '.highcharts-legend'
const highchartsTitleEl = '.highcharts-title'
//const higchartsLegendItemEl = '.highcharts-legend-item'
const unsavedVisualizationTitleText = 'Unsaved visualization'
const chartTitleEl = 'chart-title'
const chartTitleDirtyEl = 'chart-title-dirty'

const TIMEOUT_PARAMS = {
    log: false,
    timeout: 10000,
}
const NON_HIGHCHARTS_TYPES = [VIS_TYPE_PIVOT_TABLE, VIS_TYPE_SINGLE_VALUE]

export const expectVisualizationToBeVisible = visType =>
    NON_HIGHCHARTS_TYPES.includes(visType)
        ? expectVisualizationContainerToBeVisible()
        : expectChartContainerToBeVisible()

export const expectVisualizationToNotBeVisible = () => {
    expectChartContainerToNotBeVisible()
    expectVisualizationContainerToNotBeVisible()
}

const expectVisualizationContainerToBeVisible = () =>
    cy.getBySel(visualizationContainerEl, TIMEOUT_PARAMS).should('be.visible')

const expectVisualizationContainerToNotBeVisible = () =>
    cy
        .getBySel(visualizationContainerEl, TIMEOUT_PARAMS)
        .should('not.be.visible')
        .should('have.length', 0)

const expectChartContainerToBeVisible = () =>
    cy.get(chartContainerEl, TIMEOUT_PARAMS).should('be.visible')

const expectChartContainerToNotBeVisible = () =>
    cy
        .get(chartContainerEl, TIMEOUT_PARAMS)
        .should('not.be.visible')
        .should('have.length', 0)

// TODO: Expand to support items that are not in Column
export const expectChartToContainDimensionItem = (visType, itemName) => {
    switch (visType) {
        case VIS_TYPE_GAUGE:
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
            cy.get(highchartsTitleEl)
                .should('be.visible')
                .should('contain', itemName)
            break
        case VIS_TYPE_SINGLE_VALUE:
            // FIXME: Change to test if item is in title OR subtitle
            cy.getBySel(visualizationTitleEl).should(elem => {
                expect(elem.text()).to.equal(itemName)
            })
            break
        case VIS_TYPE_PIVOT_TABLE:
            cy.getBySel('visualization-column-header')
                .contains(itemName)
                .should('have.length', 1)
                .should('be.visible')
            break
        case VIS_TYPE_PIE:
            cy.get('.highcharts-label')
                .contains(itemName)
                .should('have.length', 1)
                .should('be.visible')
            break
        default:
            cy.get(highchartsLegendEl)
                .should('be.visible')
                .contains(itemName)
    }
}
export const expectChartTitleToBeValue = value =>
    cy
        .getBySel(chartTitleEl)
        .should('have.length', 1)
        .should('be.visible')
        .contains(value)

export const expectChartTitleToBeUnsaved = () =>
    cy
        .getBySel(chartTitleEl)
        .should('have.length', 1)
        .should('be.visible')
        .contains(unsavedVisualizationTitleText)

export const expectChartTitleToBeDirty = () =>
    cy
        .getBySel(chartTitleDirtyEl)
        .should('have.length', 1)
        .should('be.visible')

export const expectChartTitleToNotBeDirty = () =>
    cy
        .getBySel(chartTitleDirtyEl)
        .should('have.length', 0)
        .should('not.be.visible')
