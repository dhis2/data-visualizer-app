const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact, 'plugin:cypress/recommended'],
    plugins: ['react-hooks', 'cypress'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
}
