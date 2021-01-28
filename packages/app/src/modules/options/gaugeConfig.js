/* eslint-disable react/jsx-key */
import React from 'react'

import TargetLine from '../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange'
import AxisLabels from '../../components/VisualizationOptions/Options/AxisLabels'
import getSeriesTab from './tabs/series'
import getAxesTab from './tabs/axes'
import getVerticalAxisTemplate from './sections/templates/verticalAxis'
import getDisplayTemplate from './sections/templates/display'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'
import getLinesTemplate from './sections/templates/lines'
import getLegendTab from './tabs/legend'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'

const axisId = 'RANGE_0'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([<SkipRounding />]),
        }),
        getLinesTemplate({
            content: React.Children.toArray([
                <TargetLine axisId={axisId} />,
                <BaseLine axisId={axisId} />,
            ]),
        }),
        getAdvancedSection(),
    ]),
    getLegendTab(),
    getAxesTab([
        getVerticalAxisTemplate({
            content: React.Children.toArray([
                <AxisRange axisId={axisId} />,
                <AxisLabels axisId={axisId} />,
            ]),
        }),
    ]),
    getSeriesTab(),
    getStyleTab([getTitlesSection()]),
]
