import i18n from '@dhis2/d2-i18n'

export default ({ content, helpText, axisId }) => ({
    key: axisId ? `axes-horizontal-axis-${axisId}` : 'axes-horizontal-axis',
    label: axisId
        ? i18n.t('Horizontal (x) axis {{axisId}}', {
              axisId: Number(axisId.slice(-1)) + 1,
          })
        : i18n.t('Horizontal (x) axis'),
    content,
    helpText,
})
