module.exports = {
    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es|@dhis2/d2-ui-[a-z-]+)/)',
    ],
    setupFilesAfterEnv: ['<rootDir>/config/testSetup.js'],
    testRunner: 'jest-circus/runner',
    reporters: ['default'],
}
