module.exports = {
    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es|@dhis2/d2-ui-[a-z-]+)/)',
    ],
    setupFilesAfterEnv: ['./config/testSetup.js'],

    testRunner: 'jest-circus/runner',
    reporters: [
        'default',
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
