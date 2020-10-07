/* eslint-disable react/jsx-key */
import React from 'react'

import ShowData from '../../components/VisualizationOptions/Options/ShowData'
import HideLegend from '../../components/VisualizationOptions/Options/HideLegend'
import getLinesSection from './sections/lines'
import getVerticalAxisSection from './sections/verticalAxis'
import getHorizontalAxisSection from './sections/horizontalAxis'
import getColorSetSection from './sections/colorSet'
import getSeriesTab from './tabs/series'
import getAxesTab from './tabs/axes'
import getDataTab from './tabs/data'
import getDisplaySection from './sections/display'
import getAdvancedSection from './sections/advanced'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'
import getChartStyleTemplate from './templates/chartStyle'

export default hasCustomAxes => [
    getDataTab([
        getDisplaySection(),
        getLinesSection(hasCustomAxes),
        getAdvancedSection(),
    ]),
    getAxesTab([
        getVerticalAxisSection(hasCustomAxes),
        getHorizontalAxisSection(),
    ]),
    getSeriesTab({ showAxisOptions: true }),
    getStyleTab([
        getChartStyleTemplate({
            content: React.Children.toArray([<ShowData />, <HideLegend />]),
        }),
        getTitlesSection(),
        getColorSetSection(hasCustomAxes),
    ]),
]
