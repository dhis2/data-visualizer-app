module.exports = {
    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es|@dhis2/d2-ui-[a-z-]+)/)',
    ],
    setupFiles: ['<rootDir>/config/testGlobals.js'],
    setupFilesAfterEnv: ['<rootDir>/config/testSetup.js'],
    testRunner: 'jest-circus/runner',
    reporters: ['default'],
}
