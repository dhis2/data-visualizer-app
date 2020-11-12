// TODO: Rename file to Store and move to /elements?

import { CONFIG_PROP, TITLE_PROP, SUBTITLE_PROP, SERIES_PROP } from './config'

export const expectStoreCurrentToBeEmpty = () =>
    cy.getReduxState('current').should('be.null')

export const expectStoreCurrentColumnsToHaveLength = length =>
    cy
        .getReduxState('current')
        .its('columns')
        .should('have.length', length)

export const expectStoreConfigTitleToBeValue = value =>
    cy
        .getReduxState(CONFIG_PROP)
        .its(TITLE_PROP)
        .should('eql', value)

export const expectStoreConfigSubtitleToBeValue = value =>
    cy
        .getReduxState(CONFIG_PROP)
        .its(SUBTITLE_PROP)
        .should('eql', value)

export const expectStoreConfigSeriesToNotHaveTrendline = () =>
    cy
        .getReduxState(CONFIG_PROP)
        .its(SERIES_PROP)
        .then(series => {
            const trendlines = series.filter(
                item => item.type === 'line' || item.type === 'spline'
            )
            expect(trendlines).to.have.lengthOf(0)
        })

export const expectStoreConfigSeriesToHaveTrendline = expectedTL =>
    cy
        .getReduxState(CONFIG_PROP)
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

// export const expectStoreCurrentFilterDimensionToHaveItemsLength = (
//     filterDimension,
//     itemsLength
// ) => cy.getReduxState('current').its('filters')
// FIXME: Implement filters.find(filter => filter.dimension === dimensionId).items.length === indicators.length)
