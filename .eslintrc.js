const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact],
    plugins: ['react-hooks'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
    globals: {
        Cypress: 'readonly',
        after: 'readonly',
        before: 'readonly',
        cy: 'readonly',
    },
}
