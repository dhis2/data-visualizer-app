import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const myRoute = '/'

Given('I say hello', () => {
    cy.visit(myRoute).then(() => {
        //cy.get('#server').type(Cypress.env('dhis2_base_url'))
        cy.get('#j_username').type(Cypress.env('dhis2_username'))
        cy.get('#j_password').type(Cypress.env('dhis2_password'))
        cy.get('form').submit()
    })
})

Then('the response is world', () => {
    cy.location().should(loc => {
        expect(loc.hash).to.equal(myRoute)
    })
})
