//const startScreen = '*[class^="StartScreen_outer"]'
const primaryTitleText = 'Getting started'
const primaryTitleEl = 'start-screen-primary-section-title'
const secondaryTitleText = 'Your most viewed charts and tables'
const secondaryTitleEl = 'start-screen-secondary-section-title'
const mostViewedListItemAmount = 6
const mostViewedListItemEl = 'start-screen-most-viewed-list-item'

export const expectStartScreenToBeVisible = () =>
    cy
        .getBySel(primaryTitleEl, {
            timeout: 10000,
        })
        .should('contain', primaryTitleText)

export const expectMostViewedToBeVisible = () => {
    cy.getBySel(secondaryTitleEl).should('contain', secondaryTitleText)
    expectMostViewedToHaveItems()
}

export const expectMostViewedToHaveItems = () =>
    cy
        .getBySel(mostViewedListItemEl)
        .should('have.length', mostViewedListItemAmount)
