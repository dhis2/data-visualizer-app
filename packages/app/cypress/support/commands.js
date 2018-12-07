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
    cy.visit(Cypress.config('testUrl'));
});
