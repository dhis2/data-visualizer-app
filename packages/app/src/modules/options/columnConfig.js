/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues'
import ShowData from '../../components/VisualizationOptions/Options/ShowData'
import HideEmptyRowItems from '../../components/VisualizationOptions/Options/HideEmptyRowItems'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder'
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import DomainAxisLabel from '../../components/VisualizationOptions/Options/DomainAxisLabel'
import NoSpaceBetweenColumns from '../../components/VisualizationOptions/Options/NoSpaceBetweenColumns'
import HideLegend from '../../components/VisualizationOptions/Options/HideLegend'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import SeriesTable from '../../components/VisualizationOptions/Options/SeriesTable'
import getLinesSection from './sections/lines'
import getVerticalAxisSection from './sections/verticalAxis'

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
            getLinesSection(hasCustomAxes),
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
            getVerticalAxisSection(hasCustomAxes),
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
