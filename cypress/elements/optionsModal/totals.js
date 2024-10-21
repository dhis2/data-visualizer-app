export const colTotalsOptionEl = 'option-col-totals'
const colSubTotalsOptionEl = 'option-col-subtotals'
export const rowTotalsOptionEl = 'option-row-totals'
const rowSubTotalsOptionEl = 'option-row-subtotals'

export const expectColumnsTotalsToBeDisabled = () =>
    cy
        .getBySel(colTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.disabled')

export const expectColumnsTotalsToBeEnabled = () =>
    cy
        .getBySel(colTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('not.be.disabled')

export const expectColumnsTotalsToBeChecked = () =>
    cy
        .getBySel(colTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.checked')

export const expectColumnsTotalsToBeUnchecked = () =>
    cy
        .getBySel(colTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('not.be.checked')

export const expectColumnsSubTotalsToBeDisabled = () =>
    cy
        .getBySel(colSubTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.disabled')

export const expectColumnsSubTotalsToBeEnabled = () =>
    cy
        .getBySel(colSubTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.enabled')

export const expectColumnsSubTotalsToBeChecked = () =>
    cy
        .getBySel(colSubTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.checked')

export const expectColumnsSubTotalsToBeUnchecked = () =>
    cy
        .getBySel(colSubTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('not.be.checked')

export const expectRowsTotalsToBeDisabled = () =>
    cy
        .getBySel(rowTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.disabled')

export const expectRowsTotalsToBeEnabled = () =>
    cy
        .getBySel(rowTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.enabled')

export const expectRowsTotalsToBeChecked = () =>
    cy
        .getBySel(rowTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.checked')

export const expectRowsTotalsToBeUnchecked = () =>
    cy
        .getBySel(rowTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('not.be.checked')

export const expectRowsSubTotalsToBeDisabled = () =>
    cy
        .getBySel(rowSubTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.disabled')

export const expectRowsSubTotalsToBeEnabled = () =>
    cy
        .getBySel(rowSubTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.enabled')

export const expectRowsSubTotalsToBeChecked = () =>
    cy
        .getBySel(rowSubTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('be.checked')

export const expectRowsSubTotalsToBeUnchecked = () =>
    cy
        .getBySel(rowSubTotalsOptionEl)
        .find('[type="checkbox"]')
        .should('not.be.checked')
