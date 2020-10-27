import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const myRoute = '#/LW0O27b7TdD'

Given('I say hello', () => {
    cy.visit(myRoute)
})

Then('the response is world', () => {
    cy.location().should(loc => {
        expect(loc.hash).to.equal(myRoute)
    })
})
