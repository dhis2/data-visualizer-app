const { chromeAllowXSiteCookies } = require('@dhis2/cypress-plugins')
const registerReportPortalPlugin = require('@reportportal/agent-js-cypress/lib/plugin')
const { defineConfig } = require('cypress')
const {
    excludeByVersionTags,
} = require('./cypress/plugins/excludeByVersionTags.js')

async function setupNodeEvents(on, config) {
    chromeAllowXSiteCookies(on, config)
    excludeByVersionTags(on, config)
    registerReportPortalPlugin(on, config)

    if (!config.env.dhis2InstanceVersion) {
        throw new Error(
            'dhis2InstanceVersion is missing. Check the README for more information.'
        )
    }

    return config
}

module.exports = defineConfig({
    projectId: 'sojh88',
    reporter: '@reportportal/agent-js-cypress',
    reporterOptions: {
        endpoint: 'https://test.tools.dhis2.org/reportportal/api/v1',
        apiKey: process.env.CYPRESS_REPORTPORTAL_API_KEY,
        launch: 'data_visualizer_app_master',
        project: 'dhis2_auto',
        description: '',
        attributes: [
            {
                key: 'version',
                value: 'master',
            },
            {
                value: 'data_visualizer_app',
            },
        ],
    },
    e2e: {
        setupNodeEvents,
        baseUrl: 'http://localhost:3000',
        specPattern: 'cypress/integration/**/*.cy.js',
        viewportWidth: 1280,
        viewportHeight: 800,
        defaultCommandTimeout: 15000,
        /* Globally disable test isolation because the test suite
         * contains many tests with sequential steps */
        testIsolation: false,
        // Record video
        video: true,
        /* Only compress and upload videos for failures.
         * This will save execution time and reduce the risk
         * out-of-memory issues on the CI machine */
        videoUploadOnPasses: false,
        // Enabled to reduce the risk of out-of-memory issues
        experimentalMemoryManagement: true,
        // Set to a low number to reduce the risk of out-of-memory issues
        numTestsKeptInMemory: 5,
        /* When allowing 1 retry on CI, the test suite will pass if
         * it's flaky. And/but we also get to identify flaky tests on the
         * Cypress Dashboard. */
        retries: {
            runMode: 1,
            openMode: 0,
        },
    },
    env: {
        dhis2DatatestPrefix: 'dhis2-datavisualizer',
        networkMode: 'live',
    },
})
