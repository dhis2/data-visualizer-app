/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues'
import PercentStackedValues from '../../components/VisualizationOptions/Options/PercentStackedValues'
import ShowData from '../../components/VisualizationOptions/Options/ShowData'
import HideEmptyRowItems from '../../components/VisualizationOptions/Options/HideEmptyRowItems'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder'
import HideLegend from '../../components/VisualizationOptions/Options/HideLegend'
import HideTitle from '../../components/VisualizationOptions/Options/HideTitle'
import HideSubtitle from '../../components/VisualizationOptions/Options/HideSubtitle'
import getLinesSection from './sections/lines'
import getVerticalAxisSection from './sections/verticalAxis'
import getHorizontalAxisSection from './sections/horizontalAxis'
import getColorSetSection from './sections/colorSet'
import getSeriesTab from './tabs/series'
import getAxesTab from './tabs/axes'
import getDataTab from './tabs/data'
import getDisplayTemplate from './templates/display'
import getAdvancedSection from './sections/advanced'

export default hasCustomAxes => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([
                <PercentStackedValues />,
                <CumulativeValues />,
                <HideEmptyRowItems />,
                <SortOrder />,
            ]),
        }),
        getLinesSection(hasCustomAxes),
        getAdvancedSection(),
    ]),
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
