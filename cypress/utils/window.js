/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
import {
    TITLE_PROP,
    SUBTITLE_PROP,
    SERIES_PROP,
    Y_AXIS_PROP,
    X_AXIS_PROP,
    LEGEND_PROP,
    PLOT_LINES_PROP,
    LABELS_PROP,
} from './config'

const CONFIG_PROP = '$config'

export const expectWindowConfigTitleToBeValue = value =>
    cy.window().its(CONFIG_PROP).its(TITLE_PROP).should('eql', value)

export const expectWindowConfigSubtitleToBeValue = value =>
    cy.window().its(CONFIG_PROP).its(SUBTITLE_PROP).should('eql', value)

export const expectWindowConfigLegendToBeValue = value =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(LEGEND_PROP)
        .then(legend => {
            const { labelFormatter, ...rest } = legend
            expect({ ...rest }).to.eql(value)
        })

export const expectWindowConfigAxisPlotLinesToBeValue = ({
    axisType,
    axisIndex,
    lineIndex,
    value,
}) =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(axisType)
        .its(axisIndex)
        .its(PLOT_LINES_PROP)
        .its(lineIndex)
        .should('eql', value)

export const expectWindowConfigAxisTitleToBeValue = (
    axisType,
    axisIndex,
    value
) =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(axisType)
        .its(axisIndex)
        .its(TITLE_PROP)
        .should('eql', value)

export const expectWindowConfigAxisLabelsToBeValue = (
    axisType,
    axisIndex,
    value
) =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(axisType)
        .its(axisIndex)
        .its(LABELS_PROP)
        .should('eql', value)

export const expectWindowConfigSeriesToNotHaveTrendline = () =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(SERIES_PROP)
        .then(series => {
            const trendlines = series.filter(
                item => item.type === 'line' || item.type === 'spline'
            )
            expect(trendlines).to.have.lengthOf(0)
        })

export const expectWindowConfigSeriesToHaveTrendline = expectedTL =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(SERIES_PROP)
        .then(series => {
            const actualTL = series.find(
                item =>
                    (item.type === 'line' || item.type === 'spline') &&
                    item.name === expectedTL.name
            )
            expect(actualTL.name).to.eq(expectedTL.name)
            expect(actualTL.type).to.eq(expectedTL.type)
            expect(actualTL.dashStyle).to.eq(expectedTL.dashStyle)
            expect(actualTL.lineWidth).to.eq(expectedTL.lineWidth)
            expect(actualTL.marker).to.eql(expectedTL.marker)
            expect(actualTL.zIndex).to.eq(expectedTL.zIndex)
        })

export const expectWindowConfigYAxisToHaveTitleText = text =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(Y_AXIS_PROP)
        .then(yAxes => {
            const yAxis = yAxes[0]
            expect(yAxis.title.text).to.eq(text)
        })

export const expectWindowConfigXAxisToHaveTitleText = text =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(X_AXIS_PROP)
        .then(xAxes => {
            const xAxis = xAxes[0]
            expect(xAxis.title.text).to.eq(text)
        })

export const expectWindowConfigYAxisToHaveRangeMinValue = value =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(Y_AXIS_PROP)
        .then(yAxes => {
            const yAxis = yAxes[0]
            expect(yAxis.min).to.eq(value)
        })

export const expectWindowConfigYAxisToHaveRangeMaxValue = value =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(Y_AXIS_PROP)
        .then(yAxes => {
            const yAxis = yAxes[0]
            expect(yAxis.max).to.eq(value)
        })

export const expectWindowConfigYAxisToHaveStepsValue = value =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(Y_AXIS_PROP)
        .then(yAxes => {
            const yAxis = yAxes[0]
            expect(yAxis.tickAmount).to.eq(value)
        })

export const expectWindowConfigYAxisToHaveColor = color =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(Y_AXIS_PROP)
        .then(yAxis => {
            expect(yAxis.minColor).to.eq(color)
            expect(yAxis.maxColor).to.eq(color)
        })

export const expectWindowConfigXAxisToHaveRangeMinValue = value =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(X_AXIS_PROP)
        .then(xAxes => {
            const xAxis = xAxes[0]
            expect(xAxis.min).to.eq(value)
        })

export const expectWindowConfigXAxisToHaveRangeMaxValue = value =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(X_AXIS_PROP)
        .then(xAxes => {
            const xAxis = xAxes[0]
            expect(xAxis.max).to.eq(value)
        })

export const expectWindowConfigSeriesItemToHaveLegendSet = (
    seriesItemName,
    expectedLS
) =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(SERIES_PROP)
        .then(series => {
            const seriesItem = series.find(item => item.name === seriesItemName)
            seriesItem.data.every(item =>
                expect(item.legendSet).to.eq(expectedLS)
            )
        })

export const expectEachWindowConfigSeriesItemToHaveLegendSet = expectedLS =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(SERIES_PROP)
        .then(series =>
            series.forEach(seriesItem =>
                seriesItem.data.every(item =>
                    expect(item.legendSet).to.eq(expectedLS)
                )
            )
        )

export const expectWindowConfigSeriesItemToNotHaveLegendSet = seriesItemName =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(SERIES_PROP)
        .then(series => {
            const seriesItem = series.find(item => item.name === seriesItemName)
            seriesItem.data.every(item => expect(item).to.be.a('number'))
        })

export const expectEachWindowConfigSeriesItemToNotHaveLegendSet = () =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(SERIES_PROP)
        .then(series =>
            series.forEach(seriesItem =>
                seriesItem.data.every(item => expect(item).to.be.a('number'))
            )
        )

export const expectWindowConfigSeriesDataLabelsToHaveColor = (
    seriesItemIndex,
    expectedColor
) =>
    cy
        .window()
        .its(CONFIG_PROP)
        .its(SERIES_PROP)
        .then(series => {
            expect(series[seriesItemIndex].dataLabels.style.color).to.eq(
                expectedColor
            )
        })
