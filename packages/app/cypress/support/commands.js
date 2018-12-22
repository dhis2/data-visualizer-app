const onBeforeLoad = win => {
    // From https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/polyfill-fetch-from-tests-spec.js
    // The application will polyfill window.fetch to use XHR, so we can inspect network requests and easily stub responses using cy.server
    delete win.fetch;
};

Cypress.Commands.add('login', () => {
    const username = Cypress.env('DHIS2_USERNAME');
    const password = Cypress.env('DHIS2_PASSWORD');

    if (!username || !password) {
        throw new Error('Missing login credentials');
    }

    const loginUrl = Cypress.env('LOGIN_URL');

    cy.request({
        method: 'POST',
        url: `${loginUrl}/dhis-web-commons-security/login.action`,
        body: {
            j_username: username,
            j_password: password,
        },
        form: true,
        log: true,
    });

    // set interface language to English?
});

Cypress.Commands.add('persistLogin', () => {
    Cypress.Cookies.preserveOnce('JSESSIONID');
});

Cypress.Commands.add('loadPage', () => {
    cy.visit(Cypress.config('baseUrl'), { onBeforeLoad });
    cy.get('header', { log: false, timeout: 10000 }); // Waits for the page to fully load
});

Cypress.Commands.add('getReduxState', prop => {
    cy.window()
        .its('store')
        .invoke('getState')
        .its(prop);
});
