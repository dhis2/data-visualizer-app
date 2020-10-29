//const startScreen = '*[class^="StartScreen_outer"]'
const startScreenTitleText = 'Getting started'
const startScreenTitleEl = '*[class^="StartScreen_title"]'
const startScreenSectionEl = '*[class^="StartScreen_section"]'
const mostViewedTitleText = 'Your most viewed charts and tables'
const mostViewedItemAmount = 6
const mostViewedItemEl = '*[class^="StartScreen_visualization"]'

export const expectStartScreenToBeVisible = () =>
    cy
        .get(startScreenSectionEl)
        .eq(0)
        .children(startScreenTitleEl)
        .should(elem => {
            expect(elem.text()).to.equal(startScreenTitleText)
        })

export const expectMostViewedToBeVisible = () =>
    cy
        .get(startScreenSectionEl)
        .eq(1)
        .children(startScreenTitleEl)
        .should(elem => {
            expect(elem.text()).to.equal(mostViewedTitleText)
        })

export const expectMostViewedToHaveItems = () =>
    cy
        .get(startScreenSectionEl)
        .eq(1)
        .children(mostViewedItemEl)
        .should('have.length', mostViewedItemAmount)
