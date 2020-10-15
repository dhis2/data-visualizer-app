/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import HideTitle from '../../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../../components/VisualizationOptions/Options/HideSubtitle'

export default () => ({
    key: 'style-titles',
    label: i18n.t('Titles'),
    content: React.Children.toArray([<HideTitle />, <HideSubtitle />]),
})
