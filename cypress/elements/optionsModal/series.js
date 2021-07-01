export const setItemToAxis = (itemIndex, axis) =>
    cy
        .getBySel('series-table-item')
        .eq(itemIndex)
        .findBySel(`item-axis-${axis}`)
        .click()
