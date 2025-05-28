import React from 'react'
import AxisLabels from '../../components/VisualizationOptions/Options/AxisLabels.js'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange.js'
import { BaseLine } from '../../components/VisualizationOptions/Options/BaseLine.js'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.js'
import { TargetLine } from '../../components/VisualizationOptions/Options/TargetLine.js'
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
