import {
    TITLE_PROP,
    SUBTITLE_PROP,
    SERIES_PROP,
    Y_AXIS_PROP,
    X_AXIS_PROP,
} from './config'

const CONFIG_PROP = '$config'

export const expectWindowConfigTitleToBeValue = value =>
    cy.window().its(CONFIG_PROP).its(TITLE_PROP).should('eql', value)

export const expectWindowConfigSubtitleToBeValue = value =>
    cy.window().its(CONFIG_PROP).its(SUBTITLE_PROP).should('eql', value)

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
