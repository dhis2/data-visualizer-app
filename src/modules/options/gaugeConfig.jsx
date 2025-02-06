import React from 'react'
import AxisLabels from '../../components/VisualizationOptions/Options/AxisLabels.jsx'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange.jsx'
import { BaseLine } from '../../components/VisualizationOptions/Options/BaseLine.jsx'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.jsx'
import { TargetLine } from '../../components/VisualizationOptions/Options/TargetLine.jsx'
import getAdvancedSection from './sections/advanced.jsx'
import getDisplayTemplate from './sections/templates/display.js'
import getLinesTemplate from './sections/templates/lines.js'
import getVerticalAxisTemplate from './sections/templates/verticalAxis.js'
import getTitlesSection from './sections/titles.jsx'
import getAxesTab from './tabs/axes.jsx'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.jsx'
import getSeriesTab from './tabs/series.jsx'
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
