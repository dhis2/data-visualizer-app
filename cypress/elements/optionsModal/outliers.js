const outliersCheckboxEl = 'option-outliers-enabled-checkbox'

export const enableOutliers = () =>
    cy
        .getBySel(outliersCheckboxEl)
        .find('[type="checkbox"]')
        .check({ force: true })
        .should('be.checked')
