/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues'
import PercentStackedValues from '../../components/VisualizationOptions/Options/PercentStackedValues'
import ShowData from '../../components/VisualizationOptions/Options/ShowData'
import HideEmptyRowItems from '../../components/VisualizationOptions/Options/HideEmptyRowItems'
import RegressionType from '../../components/VisualizationOptions/Options/RegressionType'
import TargetLine from '../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder'
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange'
import RangeAxisSteps from '../../components/VisualizationOptions/Options/RangeAxisSteps'
import RangeAxisDecimals from '../../components/VisualizationOptions/Options/RangeAxisDecimals'
import RangeAxisLabel from '../../components/VisualizationOptions/Options/RangeAxisLabel'
import DomainAxisLabel from '../../components/VisualizationOptions/Options/DomainAxisLabel'
import HideLegend from '../../components/VisualizationOptions/Options/HideLegend'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import Title from '../../components/VisualizationOptions/Options/Title'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import Subtitle from '../../components/VisualizationOptions/Options/Subtitle'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'

export default [
    {
        key: 'data-tab',
        getLabel: () => i18n.t('Data'),
        content: [
            {
                key: 'data-section-1',
                content: React.Children.toArray([
                    <ShowData />,
                    <PercentStackedValues />,
                    <CumulativeValues />,
                    <HideEmptyRowItems />,
                    <RegressionType />,
                    <TargetLine />,
                    <BaseLine />,
                    <SortOrder />,
                    <AggregationType />,
                ]),
            },
            {
                key: 'data-advanced',
                getLabel: () => i18n.t('Advanced'),
                content: React.Children.toArray([<CompletedOnly />]),
            },
        ],
    },
    {
        key: 'axes-tab',
        getLabel: () => i18n.t('Axes'),
        content: [
            {
                key: 'axes-vertical-axis',
                label: i18n.t('Vertical (y) axis'),
                content: React.Children.toArray([
                    <RangeAxisLabel />,
                    <AxisRange />,
                    <RangeAxisSteps />,
                    <RangeAxisDecimals />,
                ]),
            },
            {
                key: 'axes-horizontal-axis',
                label: i18n.t('Horizontal (x) axis'),
                content: React.Children.toArray([<DomainAxisLabel />]),
            },
        ],
    },
    {
        key: 'style-tab',
        getLabel: () => i18n.t('Style'),
        content: [
            {
                key: 'style-section-1',
                content: React.Children.toArray([
                    <HideLegend />,
                    <Title />,
                    <HideTitle />,
                    <Subtitle />,
                    <HideSubtitle />,
                ]),
            },
        ],
    },
]
