import i18n from '@dhis2/d2-i18n'

export default ({ hasCumulativeValuesInPt, content }) => ({
    key: 'data-totals',
    label: i18n.t('Totals'),
    helpText: hasCumulativeValuesInPt
        ? i18n.t('Totals are not supported when using cumulative values')
        : null,
    content,
})
