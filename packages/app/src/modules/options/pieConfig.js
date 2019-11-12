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
                content: [<AggregationType />],
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
                content: [<HideTitle />, <HideSubtitle />],
            },
        ],
    },
];
