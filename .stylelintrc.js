const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.stylelint],
    rules: {
        'csstools/use-logical': [
            true,
            {
                severity: 'error',
            },
        ],
    },
}
