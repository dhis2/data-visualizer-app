/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import TargetLine from '../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange'
import SeriesAxisLabels from '../../components/VisualizationOptions/Options/SeriesAxisLabels'
import getSeriesTab from './tabs/series'
import getAxesTab from './tabs/axes'
import getVerticalAxisTemplate from './templates/verticalAxis'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'
import getLinesTemplate from './templates/lines'
import getLegendTab from './tabs/legend'

export default () => [
    getDataTab([
        getLinesTemplate({
            content: React.Children.toArray([<TargetLine />, <BaseLine />]),
        }),
        getAdvancedSection(),
    ]),
    getLegendTab(),
    getAxesTab([
        getVerticalAxisTemplate({
            content: React.Children.toArray([
                <AxisRange />,
                <SeriesAxisLabels />,
            ]),
        }),
    ]),
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
        ],
    },
]
