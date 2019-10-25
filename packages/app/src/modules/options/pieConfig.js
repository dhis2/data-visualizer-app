import React from 'react';
import i18n from '@dhis2/d2-i18n';

import AggregationType from '../../components/VisualizationOptions/Options/AggregationType';
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle';
import Title from '../../components/VisualizationOptions/Options/Title';
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle';
import Subtitle from '../../components/VisualizationOptions/Options/Subtitle';

export default [
    {
        key: 'data-tab',
        label: i18n.t('Data'),
        content: [
            {
                key: 'data-section-1',
                content: [<AggregationType />],
            },
        ],
    },
    {
        key: 'style-tab',
        label: i18n.t('Style'),
        content: [
            {
                key: 'style-section-1',
                content: [
                    <Title />,
                    <HideTitle />,
                    <Subtitle />,
                    <HideSubtitle />,
                ],
            },
        ],
    },
];
