export const expectStoreCurrentToBeEmpty = () =>
    cy.getReduxState('current').should('be.null')

export const expectStoreCurrentColumnsToHaveLength = length =>
    cy
        .getReduxState('current')
        .its('columns')
        .should('have.length', length)

export const expectStoreCurrentFilterDimensionToHaveItemsLength = (
    filterDimension,
    itemsLength
) => cy.getReduxState('current').its('filters')
// FIXME: Implement filters.find(filter => filter.dimension === dimensionId).items.length === indicators.length)
