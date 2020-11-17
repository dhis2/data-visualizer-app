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
        cy.login()
    })
}
