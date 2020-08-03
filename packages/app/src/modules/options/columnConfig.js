/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues'
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
import NoSpaceBetweenColumns from '../../components/VisualizationOptions/Options/NoSpaceBetweenColumns'
import HideLegend from '../../components/VisualizationOptions/Options/HideLegend'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import SeriesTable from '../../components/VisualizationOptions/Options/SeriesTable'

export default hasCustomAxes => [
    {
        key: 'data-tab',
        getLabel: () => i18n.t('Data'),
        content: [
            {
                key: 'data-display',
                getLabel: () => i18n.t('Display'), //TODO: change to "label" now that the whole config is wrapped in a fn?
                content: React.Children.toArray([
                    <CumulativeValues />,
                    <HideEmptyRowItems />,
                    <SortOrder />,
                ]),
            },
            {
                key: 'data-lines',
                getLabel: () => i18n.t('Lines'),
                helpText: hasCustomAxes
                    ? i18n.t(
                          'Lines are not supported yet when using multiple axes'
                      )
                    : null,
                content: React.Children.toArray([
                    <RegressionType disabled={hasCustomAxes} />,
                    <TargetLine disabled={hasCustomAxes} />,
                    <BaseLine disabled={hasCustomAxes} />,
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
                helpText: hasCustomAxes
                    ? i18n.t(
                          'Vertical axis options are not supported yet when using multiple axes'
                      )
                    : null,
                content: React.Children.toArray([
                    <RangeAxisLabel disabled={hasCustomAxes} />,
                    <AxisRange disabled={hasCustomAxes} />,
                    <RangeAxisSteps disabled={hasCustomAxes} />,
                    <RangeAxisDecimals disabled={hasCustomAxes} />,
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
        key: 'series-tab',
        getLabel: () => i18n.t('Series'),
        content: [
            {
                key: 'series-table',
                content: React.Children.toArray([
                    <SeriesTable
                        showAxisOptions={true}
                        showTypeOptions={true}
                    />,
                ]),
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
                content: React.Children.toArray([
                    <ShowData />,
                    <NoSpaceBetweenColumns />,
                    <HideLegend />,
                    /* TODO new option <BackgroundLines /> */
                ]),
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
