/* eslint-disable react/jsx-key */
import React from 'react'
import AxisLabels from '../../components/VisualizationOptions/Options/AxisLabels'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange'
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import TargetLine from '../../components/VisualizationOptions/Options/TargetLine'
import getAdvancedSection from './sections/advanced'
import getDisplayTemplate from './sections/templates/display'
import getLinesTemplate from './sections/templates/lines'
import getVerticalAxisTemplate from './sections/templates/verticalAxis'
import getTitlesSection from './sections/titles'
import getAxesTab from './tabs/axes'
import getDataTab from './tabs/data'
import getLegendTab from './tabs/legend'
import getSeriesTab from './tabs/series'
import getStyleTab from './tabs/style'

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
