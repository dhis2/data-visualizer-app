import React from 'react'
import DataIcon from '../../components/VisualizationOptions/Options/DataIcon.jsx'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator.jsx'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.jsx'
import {
    OPTION_AGGREGATION_TYPE,
    OPTION_COMPLETED_ONLY,
    OPTION_DIGIT_GROUP_SEPARATOR,
    OPTION_FONT_STYLE,
    OPTION_HIDE_SUBTITLE,
    OPTION_HIDE_TITLE,
    OPTION_ICONS,
    OPTION_LEGEND,
    OPTION_SERIES,
    OPTION_SKIP_ROUNDING,
    OPTION_SUBTITLE,
    OPTION_TITLE,
} from '../options.js'
import getAdvancedSection from './sections/advanced.jsx'
import getDisplayTemplate from './sections/templates/display.js'
import getTitlesSection from './sections/titles.jsx'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.jsx'
import getSeriesTab from './tabs/series.jsx'
import getStyleTab from './tabs/style.js'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([<SkipRounding />]),
        }),
        getAdvancedSection(),
    ]),
    getLegendTab(),
    getSeriesTab(),
    getStyleTab([
        {
            key: 'style-section-2',
            content: React.Children.toArray([
                <DigitGroupSeparator />,
                <DataIcon />,
            ]),
        },
        getTitlesSection(),
    ]),
]

export const singleValueOptionNames = () => [
    // Data tab
    OPTION_SKIP_ROUNDING,
    OPTION_AGGREGATION_TYPE,
    OPTION_COMPLETED_ONLY,
    // Legend tab
    OPTION_LEGEND,
    // Series tab
    OPTION_SERIES,
    // Style tab
    OPTION_DIGIT_GROUP_SEPARATOR,
    OPTION_ICONS,
    OPTION_FONT_STYLE,
    OPTION_TITLE,
    OPTION_HIDE_TITLE,
    OPTION_SUBTITLE,
    OPTION_HIDE_SUBTITLE,
]
