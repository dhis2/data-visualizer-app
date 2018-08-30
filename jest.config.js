module.exports = {
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
    setupFiles: ['<rootDir>/config/polyfills.js', '<rootDir>/config/shim.js'],
    testMatch: [
        '<rootDir>/packages/*/src/**/__tests__/**/*.{js,jsx,mjs}',
        '<rootDir>/packages/*/src/**/?(*.)(spec|test).{js,jsx,mjs}',
    ],
    testURL: 'http://localhost',
    setupTestFrameworkScriptFile: '<rootDir>/config/testSetup.js',
    testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/packages/*/build/',
        '<rootDir>/packages/app/scripts/',
    ],
    verbose: false,
    transform: {
        '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|css|json)$)':
            '<rootDir>/config/jest/fileTransform.js',
    },
    moduleFileExtensions: ['js', 'jsx'],
    moduleDirectories: ['node_modules'],
};
