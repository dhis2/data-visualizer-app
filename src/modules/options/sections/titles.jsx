import i18n from '@dhis2/d2-i18n'
import React from 'react'
import HideSubtitle from '../../../components/VisualizationOptions/Options/HideSubtitle.jsx'
import HideTitle from '../../../components/VisualizationOptions/Options/HideTitle.jsx'

export default () => ({
    key: 'style-titles',
    label: i18n.t('Titles'),
    content: React.Children.toArray([<HideTitle />, <HideSubtitle />]),
})
