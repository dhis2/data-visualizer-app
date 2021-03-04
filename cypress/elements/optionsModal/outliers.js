const outliersCheckboxEl = 'option-outliers-enabled-checkbox'

export const clickOutliersCheckbox = () =>
    cy
        .getBySel(outliersCheckboxEl)
        .click()
        .find('[type="checkbox"]')
        .should('be.checked')
