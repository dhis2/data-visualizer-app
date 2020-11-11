// TODO: Rename file to Store and move to /elements?

import { CONFIG_PROP, TITLE_PROP } from './config'

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

// export const expectStoreCurrentFilterDimensionToHaveItemsLength = (
//     filterDimension,
//     itemsLength
// ) => cy.getReduxState('current').its('filters')
// FIXME: Implement filters.find(filter => filter.dimension === dimensionId).items.length === indicators.length)
