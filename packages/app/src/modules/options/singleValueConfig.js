/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import Legend from '../../components/VisualizationOptions/Options/Legend'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import SeriesTable from '../../components/VisualizationOptions/Options/SeriesTable'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator'

export default () => [
    {
        key: 'data-tab',
        label: i18n.t('Data'),
        content: [
            {
                key: 'data-display',
                label: i18n.t('Display'),
                content: React.Children.toArray([<SkipRounding />]),
            },
            {
                key: 'data-advanced',
                label: i18n.t('Advanced'),
                content: React.Children.toArray([
                    <AggregationType />,
                    <CompletedOnly />,
                ]),
            },
        ],
    },
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
    {
        key: 'series-tab',
        label: i18n.t('Series'),
        content: [
            {
                key: 'series-table',
                content: React.Children.toArray([<SeriesTable />]),
            },
        ],
    },
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
