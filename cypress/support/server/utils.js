export const getApiBaseUrl = () => {
    const baseUrl = Cypress.env('dhis2_base_url') || ''

    if (!baseUrl) {
        throw new Error(
            'No `dhis2_base_url` found. Please make sure to add it to `cypress.env.json`'
        )
    }

    return baseUrl
}
