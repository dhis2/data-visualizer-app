import React from 'react';
import i18n from '@dhis2/d2-i18n';

import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues';
import PercentStackedValues from '../../components/VisualizationOptions/Options/PercentStackedValues';
import ShowData from '../../components/VisualizationOptions/Options/ShowData';
import HideEmptyRowItems from '../../components/VisualizationOptions/Options/HideEmptyRowItems';
import RegressionType from '../../components/VisualizationOptions/Options/RegressionType';
import TargetLine from '../../components/VisualizationOptions/Options/TargetLine';
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine';
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder';
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType';
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange';
import RangeAxisSteps from '../../components/VisualizationOptions/Options/RangeAxisSteps';
import RangeAxisDecimals from '../../components/VisualizationOptions/Options/RangeAxisDecimals';
import RangeAxisLabel from '../../components/VisualizationOptions/Options/RangeAxisLabel';
import DomainAxisLabel from '../../components/VisualizationOptions/Options/DomainAxisLabel';
import NoSpaceBetweenColumns from '../../components/VisualizationOptions/Options/NoSpaceBetweenColumns';
import HideLegend from '../../components/VisualizationOptions/Options/HideLegend';
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle';
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle';

export default [
    {
        key: 'data-tab',
        label: i18n.t('Data'),
        content: [
            {
                key: 'data-display',
                label: i18n.t('Display'),
                content: [
                    <ShowData />,
                    <PercentStackedValues />,
                    <CumulativeValues />,
                    <HideEmptyRowItems />,
                    <SortOrder />,
                ],
            },
            {
                key: 'data-lines',
                label: i18n.t('Lines'),
                content: [<RegressionType />, <TargetLine />, <BaseLine />],
            },
            {
                key: 'data-advanced',
                label: i18n.t('Advanced'),
                content: [<AggregationType />],
            },
        ],
    },
    {
        key: 'axes-tab',
        label: i18n.t('Axes'),
        content: [
            {
                key: 'axes-vertical-axis',
                label: i18n.t('Vertical (y) axis'),
                content: [
                    <RangeAxisLabel />,
                    <AxisRange />,
                    <RangeAxisSteps />,
                    <RangeAxisDecimals />,
                ],
            },
            {
                key: 'axes-horizontal-axis',
                label: i18n.t('Horizontal (x) axis'),
                content: [<DomainAxisLabel />],
            },
        ],
    },
    {
        key: 'style-tab',
        label: i18n.t('Style'),
        content: [
            {
                key: 'style-chart-style',
                label: i18n.t('Chart style'),
                content: [
                    <NoSpaceBetweenColumns />,
                    <HideLegend />,
                    /* TODO new option <BackgroundLines /> */
                ],
            },
            {
                key: 'style-titles',
                label: i18n.t('Titles'),
                content: [<HideTitle />, <HideSubtitle />],
            },
        ],
    },
];
