//const startScreen = '*[class^="StartScreen_outer"]'
const startScreenTitleText = 'Getting started'
const startScreenTitleEl = '*[class^="StartScreen_title"]'

export const expectStartScreenToBeVisible = () =>
    cy
        .get(startScreenTitleEl)
        .eq(0)
        .should(elem => {
            expect(elem.text()).to.equal(startScreenTitleText)
        })
