import { expectDimensionsModalToBeVisible } from '.'

const unselectedListEl = 'data-dimension-item-selector-unselected-items-list'
const unselectedItemEl =
    'data-dimension-item-selector-unselected-items-list-item'
const dataTypesSelectButtonEl = 'data-dimension-data-types-select-field-content'

export const selectRandomIndicators = amount => {
    expectDimensionsModalToBeVisible()
    for (let i = 0; i < amount; i++) {
        cy.getBySel(unselectedItemEl)
            .its('length')
            .then(size => {
                cy.getBySel(unselectedListEl)
                    .children()
                    .eq(Math.floor(Math.random() * size))
                    .dblclick()
            })
    }
}

export const selectDataElements = dataElements => {
    expectDimensionsModalToBeVisible()
    switchToDataType(
        'data-dimension-data-types-select-field-option-dataElements'
    )
    dataElements.forEach(item => clickUnselectedItem(item))
}

export const selectIndicators = indicators => {
    expectDimensionsModalToBeVisible()
    indicators.forEach(item => clickUnselectedItem(item))
}

const clickUnselectedItem = item =>
    cy
        .getBySel(unselectedListEl)
        .contains(item)
        .dblclick()

const switchToDataType = dataType => {
    cy.getBySel(dataTypesSelectButtonEl).click()
    cy.getBySel(dataType).click()
}
