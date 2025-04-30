import '@dhis2/cypress-commands'

Cypress.Commands.add('getReduxState', (prop) =>
    cy.window().its('store').invoke('getState').its(prop)
)

Cypress.Commands.add('getBySel', (selector, ...args) =>
    cy.get(`[data-test=${selector}]`, ...args)
)

Cypress.Commands.add('getBySelLike', (selector, ...args) =>
    cy.get(`[data-test*=${selector}]`, ...args)
)

Cypress.Commands.add(
    'findBySel',
    {
        prevSubject: true,
    },
    (subject, selector, ...args) =>
        cy.wrap(subject).find(`[data-test=${selector}]`, ...args)
)

Cypress.Commands.add(
    'findBySelLike',
    {
        prevSubject: true,
    },
    (subject, selector, ...args) =>
        cy.wrap(subject).find(`[data-test*=${selector}]`, ...args)
)

Cypress.Commands.add(
    'containsExact',
    {
        prevSubject: true,
    },
    (subject, selector) =>
        cy.wrap(subject).contains(
            new RegExp(
                `^${selector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, //eslint-disable-line no-useless-escape
                'gm'
            )
        )
)

Cypress.Commands.add(
    'closePopper',
    {
        prevSubject: true,
    },
    (subject) =>
        cy
            .wrap(subject)
            .closest('[data-test=dhis2-uicore-layer]')
            .click('topLeft')
)

Cypress.Commands.add('loginByApiV2', ({ username, password, baseUrl }) => {
    const HAS_API_AUTH_LOGIN_ENV_KEY = 'hasApiAuthLogin'
    const hasApiAuthLogin = Cypress.env(HAS_API_AUTH_LOGIN_ENV_KEY)
    const hasApiAuthLoginUnknown = typeof hasApiAuthLogin !== 'boolean'
    const apiAuthLoginOptions = {
        url: `${baseUrl}/api/auth/login`,
        method: 'POST',
        followRedirect: !hasApiAuthLoginUnknown,
        failOnStatusCode: !hasApiAuthLoginUnknown,
        body: {
            username: username,
            password: password,
        },
    }
    const legacyLoginOptions = {
        url: `${baseUrl}/dhis-web-commons-security/login.action`,
        method: 'POST',
        form: true,
        followRedirect: true,
        body: {
            j_username: username,
            j_password: password,
            '2fa_code': '',
        },
    }
    if (hasApiAuthLoginUnknown) {
        cy.request(apiAuthLoginOptions).then((response) => {
            if (response.status === 200) {
                Cypress.env(HAS_API_AUTH_LOGIN_ENV_KEY, true)
                cy.log('Using web API login endpoint for this test run')
            }
            if (response.status === 404 || response.status === 302) {
                cy.request(legacyLoginOptions).then((legacyResponse) => {
                    if (legacyResponse.status === 200) {
                        Cypress.env(HAS_API_AUTH_LOGIN_ENV_KEY, false)
                        cy.log('Using legacy login endpoint for this test run')
                    }
                })
            }
        })
    } else if (hasApiAuthLogin === true) {
        cy.request(apiAuthLoginOptions)
    } else {
        cy.request(legacyLoginOptions)
    }

    // Set base url for the app platform
    window.localStorage.setItem('DHIS2_BASE_URL', baseUrl)
})
