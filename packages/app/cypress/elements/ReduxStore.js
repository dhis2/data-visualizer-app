class ReduxStore {
    state(prop) {
        cy.window()
            .its('store')
            .invoke('getState')
            .its(prop);
    }
}

export default ReduxStore;
