// const columnsAxisEl = '[data-test="columns-axis"]'
// const rowsAxisEl = '[data-test="rows-axis"]'
// const filtersAxisEl = '[data-test="filters-axis"]'
// const chipEl = '[data-test="layout-chip"]'
// const chipMenuEl = '[data-test="layout-chip-menu-button"]'
const yoyCategorySelectEl = 'yoy-layout-rows-select'
const youCategorySelectOptionEl = 'yoy-layout-rows-select-option'

export const selectYoyCategoryOption = option => {
    cy.getBySel(yoyCategorySelectEl).click()
    cy.getBySelLike(youCategorySelectOptionEl)
        .contains(option)
        .click()
}
