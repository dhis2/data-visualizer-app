/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues'
import PercentStackedValues from '../../components/VisualizationOptions/Options/PercentStackedValues'
import ShowData from '../../components/VisualizationOptions/Options/ShowData'
import HideEmptyRowItems from '../../components/VisualizationOptions/Options/HideEmptyRowItems'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder'
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import DomainAxisLabel from '../../components/VisualizationOptions/Options/DomainAxisLabel'
import HideLegend from '../../components/VisualizationOptions/Options/HideLegend'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import SeriesTable from '../../components/VisualizationOptions/Options/SeriesTable'
import getLinesSection from './sections/lines'
import getVerticalAxisSection from './sections/verticalAxis'
import getColorSetSection from './sections/colorSet'
import CategoryAxisLabels from '../../components/VisualizationOptions/Options/CategoryAxisLabels'

export default hasCustomAxes => [
    {
        key: 'data-tab',
        label: i18n.t('Data'),
        content: [
            {
                key: 'data-display',
                label: i18n.t('Display'),
                content: React.Children.toArray([
                    <PercentStackedValues />,
                    <CumulativeValues />,
                    <HideEmptyRowItems />,
                    <SortOrder />,
                ]),
            },
            getLinesSection(hasCustomAxes),
            {
                key: 'data-advanced',
                label: i18n.t('Advanced'),
                content: React.Children.toArray([
                    <AggregationType />,
                    <CompletedOnly />,
                ]),
            },
        ],
    },
    {
        key: 'axes-tab',
        label: i18n.t('Axes'),
        content: [
            getVerticalAxisSection(hasCustomAxes),
            {
                key: 'axes-horizontal-axis',
                label: i18n.t('Horizontal (x) axis'),
                content: React.Children.toArray([
                    <DomainAxisLabel />,
                    <CategoryAxisLabels />,
                ]),
            },
        ],
    },
    {
        key: 'series-tab',
        label: i18n.t('Series'),
        content: [
            {
                key: 'series-table',
                content: React.Children.toArray([<SeriesTable />]),
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
                content: React.Children.toArray([<ShowData />, <HideLegend />]),
            },
            {
                key: 'style-titles',
                label: i18n.t('Titles'),
                content: React.Children.toArray([
                    <HideTitle />,
                    <HideSubtitle />,
                ]),
            },
            getColorSetSection(hasCustomAxes),
        ],
    },
]
