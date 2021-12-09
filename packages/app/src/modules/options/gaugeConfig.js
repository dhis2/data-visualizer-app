/* eslint-disable react/jsx-key */
import React from 'react'
import AxisLabels from '../../components/VisualizationOptions/Options/AxisLabels.js'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange.js'
import { BaseLine } from '../../components/VisualizationOptions/Options/BaseLine.js'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.js'
import { TargetLine } from '../../components/VisualizationOptions/Options/TargetLine.js'
import getAdvancedSection from './sections/advanced.js'
import getDisplayTemplate from './sections/templates/display.js'
import getLinesTemplate from './sections/templates/lines.js'
import getVerticalAxisTemplate from './sections/templates/verticalAxis.js'
import getTitlesSection from './sections/titles.js'
import getAxesTab from './tabs/axes.js'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.js'
import getSeriesTab from './tabs/series.js'
import getStyleTab from './tabs/style.js'

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
