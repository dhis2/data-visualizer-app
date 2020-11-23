/* eslint-disable react/jsx-key */
import React from 'react'

import TargetLine from '../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange'
import SeriesAxisLabels from '../../components/VisualizationOptions/Options/SeriesAxisLabels'
import getSeriesTab from './tabs/series'
import getAxesTab from './tabs/axes'
import getVerticalAxisTemplate from './sections/templates/verticalAxis'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'
import getLinesTemplate from './sections/templates/lines'
import getLegendTab from './tabs/legend'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'

export default () => [
    getDataTab([
        getLinesTemplate({
            content: React.Children.toArray([<TargetLine />, <BaseLine />]),
        }),
        getAdvancedSection(),
    ]),
    getLegendTab(),
    getAxesTab([
        getVerticalAxisTemplate({
            content: React.Children.toArray([
                <AxisRange />,
                <SeriesAxisLabels />,
            ]),
        }),
    ]),
    getSeriesTab(),
    getStyleTab([getTitlesSection()]),
]
