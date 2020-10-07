/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator'
import getSeriesTab from './tabs/series'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'
import getDisplayTemplate from './templates/display'
import getLegendTab from './tabs/legend'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([<SkipRounding />]),
        }),
        getAdvancedSection(),
    ]),
    getLegendTab({ hideStyleOptions: true }),
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
