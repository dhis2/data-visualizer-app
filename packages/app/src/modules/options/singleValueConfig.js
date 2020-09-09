/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import Legend from '../../components/VisualizationOptions/Options/Legend'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator'

export default [
    {
        key: 'data-tab',
        getLabel: () => i18n.t('Data'),
        content: [
            {
                key: 'data-section-1',
                content: React.Children.toArray([<SkipRounding />]),
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
                content: React.Children.toArray([
                    <Legend hideStyleOptions={true} />,
                ]),
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
            {
                key: 'style-section-2',
                content: React.Children.toArray([<DigitGroupSeparator />]),
            },
        ],
    },
]
