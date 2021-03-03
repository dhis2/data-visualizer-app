const outliersCheckboxEl = 'option-outliers-enabled-checkbox'

export const enableOutliers = () =>
    cy
        .getBySel(outliersCheckboxEl)
        .click()
        .find('[type="checkbox"]')
        .should('be.checked')
