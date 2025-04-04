import { EXTENDED_TIMEOUT } from '../support/utils.js'

//const startScreen = '*[class^="StartScreen_outer"]'
const primaryTitleText = 'Getting started'
const primaryTitleEl = 'start-screen-primary-section-title'
const secondaryTitleText = 'Your most viewed charts and tables'
const secondaryTitleEl = 'start-screen-secondary-section-title'
const mostViewedListItemAmount = 6
const mostViewedListItemEl = 'start-screen-most-viewed-list-item'

export const goToStartPage = () => {
    cy.visit('').log(Cypress.env('dhis2BaseUrl'))
    expectStartScreenToBeVisible()
}

export const expectStartScreenToBeVisible = () =>
    cy
        .getBySel(primaryTitleEl, EXTENDED_TIMEOUT)
        .should('contain', primaryTitleText)

export const expectMostViewedToBeVisible = () => {
    cy.getBySel(secondaryTitleEl).should('contain', secondaryTitleText)
    expectMostViewedToHaveItems()
}

export const expectMostViewedToHaveItems = () =>
    cy
        .getBySel(mostViewedListItemEl)
        .should('have.length', mostViewedListItemAmount)
