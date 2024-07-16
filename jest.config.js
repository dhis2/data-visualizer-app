console.log('JEST CONFIG', process.env)

module.exports = {
    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es|@dhis2/d2-ui-[a-z-]+)/)',
    ],
    setupFilesAfterEnv: ['./config/testSetup.js'],

    testRunner: 'jest-circus/runner',
    reporters: [
        'github-actions',
        [
            '@reportportal/agent-js-jest',
            {
                apiKey: process.env.REPORTPORTAL_API_KEY,
                endpoint: process.env.REPORTPORTAL_ENDPOINT,
                project: process.env.REPORTPORTAL_PROJECT,
                launch: 'data_visualizer_app_master',
                attributes: [
                    {
                        key: 'version',
                        value: 'master',
                    },
                    {
                        key: 'app_name',
                        value: 'data_visualizer_app',
                    },
                    {
                        key: 'test_level',
                        value: 'unit/integration',
                    },
                ],
                description: '',
                debug: true,
            },
        ],
    ],
}
