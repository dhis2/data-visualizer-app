/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import SeriesTable from '../../components/VisualizationOptions/Options/SeriesTable'

export default () => [
    {
        key: 'data-tab',
        getLabel: () => i18n.t('Data'),
        content: [
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
