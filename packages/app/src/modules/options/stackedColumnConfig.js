/* eslint-disable react/jsx-key */
import React from 'react'

import CumulativeValues from '../../components/VisualizationOptions/Options/CumulativeValues'
import PercentStackedValues from '../../components/VisualizationOptions/Options/PercentStackedValues'
import HideEmptyRowItems from '../../components/VisualizationOptions/Options/HideEmptyRowItems'
import SortOrder from '../../components/VisualizationOptions/Options/SortOrder'
import getLinesSection from './sections/lines'
import getVerticalAxisSection from './sections/verticalAxis'
import getHorizontalAxisSection from './sections/horizontalAxis'
import getColorSetSection from './sections/colorSet'
import getSeriesTab from './tabs/series'
import getAxesTab from './tabs/axes'
import getDataTab from './tabs/data'
import getDisplayTemplate from './templates/display'
import getAdvancedSection from './sections/advanced'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'
import getChartStyleSection from './sections/chartStyle'

export default hasCustomAxes => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([
                <PercentStackedValues />,
                <CumulativeValues />,
                <HideEmptyRowItems />,
                <SortOrder />,
            ]),
        }),
        getLinesSection(hasCustomAxes),
        getAdvancedSection(),
    ]),
    getAxesTab([
        getVerticalAxisSection(hasCustomAxes),
        getHorizontalAxisSection(),
    ]),
    getSeriesTab(),
    getStyleTab([
        getChartStyleSection(),
        getTitlesSection(),
        getColorSetSection(hasCustomAxes),
    ]),
]
