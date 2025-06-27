export const getApiBaseUrl = () => {
    const baseUrl = Cypress.env('dhis2BaseUrl') || ''
    const apiVersion = Cypress.env('dhis2InstanceVersion') || ''

    if (!baseUrl) {
        throw new Error(
            'No `dhis2BaseUrl` found. Please make sure to add it to `cypress.env.json`'
        )
    }

    if (!apiVersion) {
        throw new Error(
            'No `dhis2InstanceVersion` found. Please make sure to add it to `cypress.env.json` and to only contain the api version'
        )
    }

    return new URL(`api/${apiVersion}`, `${baseUrl}/`).href
}
