import React from 'react';
import i18n from '@dhis2/d2-i18n';

import AggregationType from '../../components/VisualizationOptions/Options/AggregationType';
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle';
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle';

export default [
    {
        key: 'data-tab',
        label: i18n.t('Data'),
        content: [
            {
                key: 'data-advanced',
                label: i18n.t('Advanced'),
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([<AggregationType />]),
                /* eslint-enable react/jsx-key */
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
                /* eslint-disable react/jsx-key */
                content: React.Children.toArray([<HideTitle />, <HideSubtitle />]),
                /* eslint-enable react/jsx-key */
            },
        ],
    },
];
