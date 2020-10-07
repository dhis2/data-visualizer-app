/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import TargetLine from '../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange'
import Legend from '../../components/VisualizationOptions/Options/Legend'
import SeriesAxisLabels from '../../components/VisualizationOptions/Options/SeriesAxisLabels'
import getSeriesTab from './tabs/series'
import getAxesTab from './tabs/axes'
import getVerticalAxisTemplate from './templates/verticalAxis'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'
import getLinesTemplate from './templates/lines'

export default () => [
    getDataTab([
        getLinesTemplate({
            content: React.Children.toArray([<TargetLine />, <BaseLine />]),
        }),
        getAdvancedSection(),
    ]),
    {
        key: 'legend-tab',
        label: i18n.t('Legend'),
        content: [
            {
                key: 'legend-section-1',
                content: React.Children.toArray([<Legend />]),
            },
        ],
    },
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
