import React from 'react'
import AxisLabels from '../../components/VisualizationOptions/Options/AxisLabels.jsx'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange.jsx'
import { BaseLine } from '../../components/VisualizationOptions/Options/BaseLine.jsx'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.jsx'
import { TargetLine } from '../../components/VisualizationOptions/Options/TargetLine.jsx'
import {
    OPTION_LEGEND,
    OPTION_SKIP_ROUNDING,
    OPTION_REGRESSION_TYPE,
    OPTION_AGGREGATION_TYPE,
    OPTION_COMPLETED_ONLY,
    OPTION_AXES,
    OPTION_SERIES,
    OPTION_TITLE,
    OPTION_SUBTITLE,
    OPTION_HIDE_TITLE,
    OPTION_HIDE_SUBTITLE,
    OPTION_FONT_STYLE,
} from '../options.js'
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

export const gaugeOptionNames = () => [
    // Data tab
    OPTION_SKIP_ROUNDING,
    OPTION_REGRESSION_TYPE,
    OPTION_AGGREGATION_TYPE,
    OPTION_COMPLETED_ONLY,
    // Legend tab
    OPTION_LEGEND,
    // Axes tab
    OPTION_AXES,
    // Series tab
    OPTION_SERIES,
    // Style tab
    OPTION_FONT_STYLE,
    OPTION_TITLE,
    OPTION_HIDE_TITLE,
    OPTION_SUBTITLE,
    OPTION_HIDE_SUBTITLE,
]
