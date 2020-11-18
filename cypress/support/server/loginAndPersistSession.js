import { getApiBaseUrl } from './utils.js'

export default function loginAndPersistSession() {
    const baseUrl = getApiBaseUrl()

    beforeEach(() => {
        // This ensures the app platform knows which URL to use
        // even if REACT_APP_DHIS2_BASE_URL is undefined
        // It also ensures that the value from the cypress env
        // is used instead of REACT_APP_DHIS2_BASE_URL
        localStorage.setItem('DHIS2_BASE_URL', baseUrl)

        Cypress.Cookies.preserveOnce('JSESSIONID')
    })

    before(() => {
        const url = Cypress.env('dhis2_base_url')
        const user = Cypress.env('dhis2_base_username')
        const pass = Cypress.env('dhis2_base_password')
        const withprefix = Cypress.env('withprefix')
        const withoutprefix = Cypress.env('withoutprefix')
        const urlcaps = Cypress.env('DHIS2_BASE_URL')

        cy.log('url', url)
        cy.log('user', user)
        cy.log('pass', pass)
        cy.log('withprefix', withprefix)
        cy.log('withoutprefix', withoutprefix)
        cy.log('urlcaps', urlcaps)
        cy.login()
    })
}
