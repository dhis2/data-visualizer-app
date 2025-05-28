import React from 'react'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator.js'
import DisplayDensity from '../../components/VisualizationOptions/Options/DisplayDensity.js'
import FontSize from '../../components/VisualizationOptions/Options/FontSize.js'
import Outliers from '../../components/VisualizationOptions/Options/OutliersForOutlierTable.js'
import OutliersMaxResults from '../../components/VisualizationOptions/Options/OutliersMaxResults.js'
import ShowHierarchy from '../../components/VisualizationOptions/Options/ShowHierarchy.js'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.js'
import {
    OPTION_DIGIT_GROUP_SEPARATOR,
    OPTION_DISPLAY_DENSITY,
    OPTION_FONT_SIZE,
    OPTION_OUTLIER_ANALYSIS,
    OPTION_SHOW_HIERARCHY,
    OPTION_SKIP_ROUNDING,
} from '../options.js'
import getDisplayTemplate from './sections/templates/display.js'
import getDataTab from './tabs/data.js'
import getOutliersTab from './tabs/outliers.js'
import getStyleTab from './tabs/style.js'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([
                <SkipRounding />,
                <OutliersMaxResults />,
            ]),
        }),
    ]),
    getStyleTab([
        {
            key: 'style-section-1',
            content: React.Children.toArray([
                <DisplayDensity />,
                <FontSize />,
                <DigitGroupSeparator />,
                <ShowHierarchy />,
            ]),
        },
    ]),
    getOutliersTab([
        {
            key: 'outliers-section-1',
            content: React.Children.toArray([<Outliers />]),
        },
    ]),
]

export const outlierTableOptionNames = () => [
    // Data tab
    OPTION_SKIP_ROUNDING,
    // Style tab
    OPTION_DISPLAY_DENSITY,
    OPTION_FONT_SIZE,
    OPTION_DIGIT_GROUP_SEPARATOR,
    OPTION_SHOW_HIERARCHY,
    // Outliers tab
    OPTION_OUTLIER_ANALYSIS,
]
