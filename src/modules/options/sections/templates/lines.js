import i18n from '@dhis2/d2-i18n'

export default ({ content, helpText }) => ({
    key: 'data-lines',
    label: i18n.t('Lines'),
    content,
    helpText,
})
