const dimensionsModalEl = '[data-test="dhis2-uicore-modal"]' // TODO: Add data-test specific to this modal
const unselectedListEl = '.unselected-list'
const unselectedItemEl = '.unselected-list-item'

export const selectRandomIndicators = amount => {
    for (let i = 0; i < amount; i++) {
        cy.get(dimensionsModalEl)
            .find(unselectedItemEl)
            .its('length')
            .then(size => {
                cy.get(dimensionsModalEl)
                    .find(unselectedListEl)
                    .eq(Math.floor(Math.random() * size))
                    .dblclick()
            })
    }
}

export const selectIndicator = indicator => {
    cy.get(dimensionsModalEl)
        .find(unselectedListEl)
        .contains(indicator)
        .dblclick()
}

export const clickUpdate = () => {
    cy.get(`[data-test=dhis2-uicore-buttonstrip]`) // TODO: Add a data-test to the modal to target this better
        .find(`[data-test=dhis2-uicore-button]`)
        .eq(1)
        .click()
}
