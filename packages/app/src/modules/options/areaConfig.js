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
import RangeAxisMinValue from '../../components/VisualizationOptions/Options/RangeAxisMinValue'
import RangeAxisMaxValue from '../../components/VisualizationOptions/Options/RangeAxisMaxValue'
import RangeAxisSteps from '../../components/VisualizationOptions/Options/RangeAxisSteps'
import RangeAxisDecimals from '../../components/VisualizationOptions/Options/RangeAxisDecimals'
import RangeAxisLabel from '../../components/VisualizationOptions/Options/RangeAxisLabel'
import DomainAxisLabel from '../../components/VisualizationOptions/Options/DomainAxisLabel'
import HideLegend from '../../components/VisualizationOptions/Options/HideLegend'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'

export default [
    {
        key: 'data-tab',
        getLabel: () => i18n.t('Data'),
        content: [
            {
                key: 'data-display',
                getLabel: () => i18n.t('Display'),
                content: React.Children.toArray([
                    <PercentStackedValues />,
                    <CumulativeValues />,
                    <HideEmptyRowItems />,
                    <SortOrder />,
                ]),
            },
            {
                key: 'data-lines',
                getLabel: () => i18n.t('Lines'),
                content: React.Children.toArray([
                    <RegressionType />,
                    <TargetLine />,
                    <BaseLine />,
                ]),
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
        key: 'axes-tab',
        getLabel: () => i18n.t('Axes'),
        content: [
            {
                key: 'axes-vertical-axis',
                getLabel: () => i18n.t('Vertical (y) axis'),
                content: React.Children.toArray([
                    <RangeAxisMinValue />,
                    <RangeAxisMaxValue />,
                    <RangeAxisSteps />,
                    <RangeAxisDecimals />,
                    <RangeAxisLabel />,
                    <DomainAxisLabel />,
                ]),
            },
            {
                key: 'axes-horizontal-axis',
                getLabel: () => i18n.t('Horizontal (x) axis'),
                content: React.Children.toArray([<DomainAxisLabel />]),
            },
        ],
    },
    {
        key: 'style-tab',
        getLabel: () => i18n.t('Style'),
        content: [
            {
                key: 'style-chart-style',
                getLabel: () => i18n.t('Chart style'),
                content: React.Children.toArray([<ShowData />, <HideLegend />]),
            },
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
