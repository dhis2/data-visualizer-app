const reportPortalConfig = [
    '@reportportal/agent-js-jest',
    {
        apiKey: process.env.REPORTPORTAL_API_KEY,
        endpoint: process.env.REPORTPORTAL_ENDPOINT,
        project: process.env.REPORTPORTAL_PROJECT,
        launch: 'data-visualizer-app',
        attributes: [
            {
                key: 'dhis2_version',
                value: 'master',
            },
            {
                key: 'app_name',
                value: 'data-visualizer-app',
            },
            {
                key: 'test_level',
                value: 'unit/integration',
            },
            {
                key: 'BRANCH_NAME',
                value: process.env.BRANCH_NAME,
            },
            {
                key: 'CI_BUILD_ID',
                value: process.env.CI_BUILD_ID,
            },
            {
                key: 'PR_TITLE',
                value: process.env.PR_TITLE,
            },
        ],
        description: '',
        debug: false,
    },
]

const isDependabotPR = process.env.GITHUB_ACTOR === 'dependabot[bot]'
const isGithubActionsRun = process.env.CI === 'true'
const isReportPortalSetup =
    process.env.REPORTPORTAL_API_KEY !== undefined &&
    process.env.REPORTPORTAL_ENDPOINT !== undefined &&
    process.env.REPORTPORTAL_PROJECT !== undefined

module.exports = {
    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es|@dhis2/d2-ui-[a-z-]+)/)',
    ],
    setupFilesAfterEnv: ['<rootDir>/config/testSetup.js'],

    testRunner: 'jest-circus/runner',
    reporters: [
        'default',
        ...(isGithubActionsRun && isReportPortalSetup && !isDependabotPR
            ? [reportPortalConfig]
            : []),
    ],
}
