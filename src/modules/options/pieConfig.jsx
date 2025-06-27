import React from 'react'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.jsx'
import {
    OPTION_AGGREGATION_TYPE,
    OPTION_COLOR_SET,
    OPTION_COMPLETED_ONLY,
    OPTION_FONT_STYLE,
    OPTION_HIDE_SUBTITLE,
    OPTION_HIDE_TITLE,
    OPTION_MEASURE_CRITERIA,
    OPTION_SERIES,
    OPTION_SKIP_ROUNDING,
    OPTION_SUBTITLE,
    OPTION_TITLE,
} from '../options.js'
import getAdvancedSection from './sections/advanced.jsx'
import getColorSetSection from './sections/colorSet.jsx'
import getDisplayTemplate from './sections/templates/display.js'
import getTitlesSection from './sections/titles.jsx'
import getDataTab from './tabs/data.js'
import getLimitValuesTab from './tabs/limitValues.jsx'
import getSeriesTab from './tabs/series.jsx'
import getStyleTab from './tabs/style.js'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([<SkipRounding />]),
        }),
        getAdvancedSection(),
    ]),
    getSeriesTab(),
    getStyleTab([getTitlesSection(), getColorSetSection()]),
    getLimitValuesTab(),
]

export const pieOptionNames = () => [
    // Data tab
    OPTION_SKIP_ROUNDING,
    OPTION_AGGREGATION_TYPE,
    OPTION_COMPLETED_ONLY,
    // Series tab
    OPTION_SERIES,
    // Style tab
    OPTION_FONT_STYLE,
    OPTION_TITLE,
    OPTION_HIDE_TITLE,
    OPTION_SUBTITLE,
    OPTION_HIDE_SUBTITLE,
    OPTION_COLOR_SET,
    // Limit values tab
    OPTION_MEASURE_CRITERIA,
]
