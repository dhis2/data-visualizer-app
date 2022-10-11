import i18n from '@dhis2/d2-i18n'

export default ({ content, helpText, axisId }) => ({
    key: axisId ? `axes-vertical-axis-${axisId}` : 'axes-vertical-axis',
    label: axisId
        ? i18n.t('Vertical (y) axis {{axisId}}', {
              axisId: Number(axisId.slice(-1)) + 1,
          })
        : i18n.t('Vertical (y) axis'),
    content,
    helpText,
})
