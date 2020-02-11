/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import TargetLine from '../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine'
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange'

export default [
    {
        key: 'data-tab',
        label: i18n.t('Data'),
        content: [
            {
                key: 'data-lines',
                label: i18n.t('Lines'),
                content: React.Children.toArray([<TargetLine />, <BaseLine />]),
            },
            {
                key: 'data-range',
                label: i18n.t('Range'),
                content: React.Children.toArray([<AxisRange />]),
            },
            {
                key: 'data-advanced',
                label: i18n.t('Advanced'),
                content: React.Children.toArray([<AggregationType />]),
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
        ],
    },
]
