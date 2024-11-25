const fs = require('fs')
const { chromeAllowXSiteCookies } = require('@dhis2/cypress-plugins')
const { defineConfig } = require('cypress')
const {
    excludeByVersionTags,
} = require('./cypress/plugins/excludeByVersionTags.js')

async function setupNodeEvents(on, config) {
    chromeAllowXSiteCookies(on, config)
    excludeByVersionTags(on, config)

    // Delete videos for passing tests
    on('after:spec', (spec, results) => {
        try {
            if (results && results.video) {
                // Do we have failures for any retry attempts?
                const failures = results.tests.some((test) =>
                    test.attempts.some((attempt) => attempt.state === 'failed')
                )
                if (!failures) {
                    // delete the video if the spec passed and no tests retried
                    fs.unlinkSync(results.video)
                }
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('Video already deleted')
            } else {
                throw error
            }
        }
    })

    if (!config.env.dhis2InstanceVersion) {
        throw new Error(
            'dhis2InstanceVersion is missing. Check the README for more information.'
        )
    }

    return config
}

module.exports = defineConfig({
    projectId: 'sojh88',
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
