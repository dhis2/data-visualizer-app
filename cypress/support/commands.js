Cypress.Commands.add('getReduxState', prop =>
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
