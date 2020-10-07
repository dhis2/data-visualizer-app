/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import Legend from '../../components/VisualizationOptions/Options/Legend'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator'
import getSeriesTab from './tabs/series'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'
import getDisplayTemplate from './templates/display'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([<SkipRounding />]),
        }),
        getAdvancedSection(),
    ]),
    {
        key: 'legend-tab',
        label: i18n.t('Legend'),
        content: [
            {
                key: 'legend-section-1',
                content: React.Children.toArray([
                    <Legend hideStyleOptions={true} />,
                ]),
            },
        ],
    },
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
            {
                key: 'style-section-2',
                content: React.Children.toArray([<DigitGroupSeparator />]),
            },
        ],
    },
]
