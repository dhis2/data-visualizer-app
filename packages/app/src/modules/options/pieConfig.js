/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import getColorSetSection from './sections/colorSet'
import getSeriesTab from './tabs/series'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'

export default () => [
    getDataTab([getAdvancedSection()]),
    getSeriesTab(),
    {
        key: 'style-tab',
        label: i18n.t('Style'),
        content: [
            {
                key: 'style-titles',
                label: i18n.t('Titles'),
                content: React.Children.toArray([
                    <HideTitle />,
                    <HideSubtitle />,
                ]),
            },
            getColorSetSection(),
        ],
    },
]
