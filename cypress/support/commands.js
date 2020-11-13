Cypress.Commands.add('getReduxState', prop => {
    cy.window()
        .its('store')
        .invoke('getState')
        .its(prop)
})

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args)
})

Cypress.Commands.add(
    'findBySel',
    {
        prevSubject: true,
    },
    (subject, selector, ...args) => {
        return cy.wrap(subject).find(`[data-test=${selector}]`, ...args)
    }
)

Cypress.Commands.add(
    'findBySelLike',
    {
        prevSubject: true,
    },
    (subject, selector, ...args) => {
        return cy.wrap(subject).find(`[data-test*=${selector}]`, ...args)
    }
)

/* 
FIXME: Draft for a containsExact command
Cypress.Commands.add(
    'containsExact',
    {
        prevSubject: true,
    },
    (subject, selector) => {
        return cy.wrap(subject).contains(new RegExp(`^${selector}$`, 'g'))
    }
)
*/
