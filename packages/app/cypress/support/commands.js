const onBeforeLoad = win => {
    // From https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/polyfill-fetch-from-tests-spec.js
    // The application should polyfill window.fetch to use XHR, so we can inspect network requests and easily stub responses using cy.server
    delete win.fetch;
};

Cypress.Commands.add('login', (username, password) => {
    const uname = username || Cypress.config('username');
    const pswd = password || Cypress.config('password');
    cy.request({
        method: 'POST',
        url: Cypress.config('loginUrl'),
        body: {
            j_username: uname,
            j_password: pswd,
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
    cy.visit(Cypress.config('testUrl'), { onBeforeLoad });
    cy.get('header', { log: false, timeout: 10000 }); // Waits for the page to fully load
});
