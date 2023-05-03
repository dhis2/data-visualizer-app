import {
    VIS_TYPE_COLUMN,
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
const highchartsSubtitleEl = '.highcharts-subtitle'
const highchartsSeriesKeyItemEl = '.highcharts-legend-item'
const highchartsChartItemEl = '.highcharts-series'
const unsavedVisualizationTitleText = 'Unsaved visualization'
const AOTitleEl = 'AO-title'
const AOTitleDirtyEl = 'AO-title-dirty'
const timeout = {
    timeout: 20000,
}
const nonHighchartsTypes = [VIS_TYPE_PIVOT_TABLE, VIS_TYPE_SINGLE_VALUE]

export const expectVisualizationToBeVisible = (visType = VIS_TYPE_COLUMN) =>
    nonHighchartsTypes.includes(visType)
        ? expectVisualizationContainerToBeVisible()
        : expectChartContainerToBeVisible()

export const expectVisualizationToNotBeVisible = () => {
    expectChartContainerToNotBeVisible()
    expectVisualizationContainerToNotBeVisible()
}

const expectVisualizationContainerToBeVisible = () =>
    cy.getBySel(visualizationContainerEl, timeout).should('be.visible')

const expectVisualizationContainerToNotBeVisible = () =>
    cy.getBySel(visualizationContainerEl, timeout).should('not.exist')

const expectChartContainerToBeVisible = () =>
    cy.get(chartContainerEl, timeout).should('be.visible')

export const expectChartTitleToBeVisible = () =>
    cy.get(highchartsTitleEl, timeout).should('be.visible')

export const expectChartSubtitleToBeVisible = () =>
    cy.get(highchartsSubtitleEl, timeout).should('be.visible')

const expectChartContainerToNotBeVisible = () =>
    cy.get(chartContainerEl, timeout).should('not.exist')

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
            cy.getBySel(visualizationTitleEl).should('contain', itemName)
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
export const expectAOTitleToBeValue = (value) =>
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
    cy.getBySel(AOTitleDirtyEl).should('have.length', 1).and('be.visible')

export const expectAOTitleToNotBeDirty = () =>
    cy.getBySel(AOTitleDirtyEl).should('not.exist')

export const expectSeriesKeyToHaveSeriesKeyItems = (itemAmount) =>
    cy.get(highchartsSeriesKeyItemEl).should('have.length', itemAmount)

export const clickChartItem = (index) =>
    cy.get(highchartsChartItemEl).children().eq(index).click()

export const expectChartItemsToHaveLength = (length) =>
    cy.get(highchartsChartItemEl).children().should('have.length', length)

export const expectSVTitleToHaveColor = (color) =>
    cy.getBySel(visualizationTitleEl).invoke('attr', 'fill').should('eq', color)

export const expectSVSubtitleToHaveColor = (color) =>
    cy
        .getBySel(visualizationSubtitleEl)
        .invoke('attr', 'fill')
        .should('eq', color)
