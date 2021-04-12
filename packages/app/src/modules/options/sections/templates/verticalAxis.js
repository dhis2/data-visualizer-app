import i18n from '@dhis2/d2-i18n'

export default ({ content, helpText, axisId }) => ({
    key: `axes-vertical-axis-${axisId}`,
    label: i18n.t('Vertical (y) axis'),
    content,
    helpText,
})
