/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import TargetLine from '../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine'
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange'
import Legend from '../../components/VisualizationOptions/Options/Legend'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import SeriesTable from '../../components/VisualizationOptions/Options/SeriesTable'

export default () => [
    {
        key: 'data-tab',
        getLabel: () => i18n.t('Data'),
        content: [
            {
                key: 'data-lines',
                getLabel: () => i18n.t('Lines'),
                content: React.Children.toArray([<TargetLine />, <BaseLine />]),
            },
            {
                key: 'data-advanced',
                getLabel: () => i18n.t('Advanced'),
                content: React.Children.toArray([
                    <AggregationType />,
                    <CompletedOnly />,
                ]),
            },
        ],
    },
    {
        key: 'legend-tab',
        getLabel: () => i18n.t('Legend'),
        content: [
            {
                key: 'legend-section-1',
                content: React.Children.toArray([<Legend />]),
            },
        ],
    },
    {
        key: 'axes-tab',
        getLabel: () => i18n.t('Axes'),
        content: [
            {
                key: 'axes-vertical-axis',
                getLabel: () => i18n.t('Vertical (y) axis'),
                content: React.Children.toArray([<AxisRange />]),
            },
        ],
    },
    {
        key: 'series-tab',
        getLabel: () => i18n.t('Series'),
        content: [
            {
                key: 'series-table',
                content: React.Children.toArray([<SeriesTable />]),
            },
        ],
    },
    {
        key: 'style-tab',
        getLabel: () => i18n.t('Style'),
        content: [
            {
                key: 'style-titles',
                getLabel: () => i18n.t('Titles'),
                content: React.Children.toArray([
                    <HideTitle />,
                    <HideSubtitle />,
                ]),
            },
        ],
    },
]
