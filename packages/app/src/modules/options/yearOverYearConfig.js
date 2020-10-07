/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues'
import ShowData from '../../components/VisualizationOptions/Options/ShowData'
import HideEmptyRowItems from '../../components/VisualizationOptions/Options/HideEmptyRowItems'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder'
import AggregationType from '../../components/VisualizationOptions/Options/AggregationType'
import NoSpaceBetweenColumns from '../../components/VisualizationOptions/Options/NoSpaceBetweenColumns'
import HideLegend from '../../components/VisualizationOptions/Options/HideLegend'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import CompletedOnly from '../../components/VisualizationOptions/Options/CompletedOnly'
import getLinesSection from './sections/lines'
import getVerticalAxisSection from './sections/verticalAxis'
import getHorizontalAxisSection from './sections/horizontalAxis'
import getColorSetSection from './sections/colorSet'
import getSeriesTab from './tabs/series'
import getAxesTab from './tabs/axes'

export default hasCustomAxes => [
    {
        key: 'data-tab',
        label: i18n.t('Data'),
        content: [
            {
                key: 'data-display',
                label: i18n.t('Display'),
                content: React.Children.toArray([
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
    getAxesTab([
        getVerticalAxisSection(hasCustomAxes),
        getHorizontalAxisSection(),
    ]),
    getSeriesTab(),
    {
        key: 'style-tab',
        label: i18n.t('Style'),
        content: [
            {
                key: 'style-chart-style',
                label: i18n.t('Chart style'),
                content: React.Children.toArray([
                    <ShowData />,
                    <NoSpaceBetweenColumns />,
                    <HideLegend />,
                    /* TODO new option <BackgroundLines /> */
                ]),
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
