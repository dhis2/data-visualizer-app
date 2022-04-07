/* eslint-disable react/jsx-key */
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import HideSubtitle from '../../../components/VisualizationOptions/Options/HideSubtitle.js'
import HideTitle from '../../../components/VisualizationOptions/Options/HideTitle.js'

export default () => ({
    key: 'style-titles',
    label: i18n.t('Titles'),
    content: React.Children.toArray([<HideTitle />, <HideSubtitle />]),
})
