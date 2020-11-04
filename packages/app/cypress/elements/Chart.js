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
const visualizationSubtitleEl = 'visualization-subtitle'
const chartContainerEl = '.highcharts-container'
const highchartsLegendEl = '.highcharts-legend'
const highchartsTitleEl = '.highcharts-title'
//const higchartsLegendItemEl = '.highcharts-legend-item'
const unsavedVisualizationTitleText = 'Unsaved visualization'
const AOTitleEl = 'AO-title'
const AOTitleDirtyEl = 'AO-title-dirty'

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
        .and('have.length', 0)

const expectChartContainerToBeVisible = () =>
    cy.get(chartContainerEl, TIMEOUT_PARAMS).should('be.visible')

const expectChartContainerToNotBeVisible = () =>
    cy
        .get(chartContainerEl, TIMEOUT_PARAMS)
        .should('not.be.visible')
        .and('have.length', 0)

// TODO: Expand to support items that are not in Columns
export const expectChartToContainDimensionItem = (visType, itemName) => {
    switch (visType) {
        case VIS_TYPE_GAUGE:
        case VIS_TYPE_YEAR_OVER_YEAR_COLUMN:
        case VIS_TYPE_YEAR_OVER_YEAR_LINE:
            cy.get(highchartsTitleEl)
                .should('be.visible')
                .and('contain', itemName)
            break
        case VIS_TYPE_SINGLE_VALUE:
            cy.getBySel(visualizationTitleEl, visualizationSubtitleEl).should(
                'contain',
                itemName
            )
            break
        case VIS_TYPE_PIVOT_TABLE:
            cy.getBySel('visualization-column-header')
                .contains(itemName)
                .should('have.length', 1)
                .and('be.visible')
            break
        case VIS_TYPE_PIE:
            cy.get('.highcharts-label')
                .contains(itemName)
                .should('have.length', 1)
                .and('be.visible')
            break
        default:
            cy.get(highchartsLegendEl)
                .should('be.visible')
                .and('contain', itemName)
    }
}
export const expectAOTitleToBeValue = value =>
    cy
        .getBySel(AOTitleEl)
        .should('have.length', 1)
        .and('be.visible')
        .and('contain', value)

export const expectAOTitleToBeUnsaved = () =>
    cy
        .getBySel(AOTitleEl)
        .should('have.length', 1)
        .and('be.visible')
        .and('contain', unsavedVisualizationTitleText)

export const expectAOTitleToBeDirty = () =>
    cy
        .getBySel(AOTitleDirtyEl)
        .should('have.length', 1)
        .and('be.visible')

export const expectAOTitleToNotBeDirty = () =>
    cy
        .getBySel(AOTitleDirtyEl)
        .should('have.length', 0)
        .and('not.be.visible')
