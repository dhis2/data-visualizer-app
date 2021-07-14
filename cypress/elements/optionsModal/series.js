export const setItemToAxis = (itemIndex, axis) =>
    cy
        .getBySel('series-table-item')
        .eq(itemIndex)
        .findBySel(`item-axis-${axis}`)
        .click()

export const setItemToType = (itemIndex, type) =>
    cy
        .getBySel('series-table-item')
        .eq(itemIndex)
        .findBySel(`item-type-${type}`)
        .click()
