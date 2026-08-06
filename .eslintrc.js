const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact, 'plugin:cypress/recommended'],
    overrides: [
        {
            files: [
                '**/*.spec.jsx',
                '**/*.test.jsx',
                '**/__tests__/**/*.js',
                '**/__tests__/**/*.jsx',
                '**/testsContext.js',
            ],
            rules: {
                'react/prop-types': 'off',
                'react/display-name': 'off',
            },
        },
    ],
}
