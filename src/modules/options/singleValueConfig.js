/* eslint-disable react/jsx-key */
import React from 'react'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator.js'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.js'
import getAdvancedSection from './sections/advanced.js'
import getDisplayTemplate from './sections/templates/display.js'
import getTitlesSection from './sections/titles.js'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.js'
import getSeriesTab from './tabs/series.js'
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
        getTitlesSection(),
        {
            key: 'style-section-2',
            content: React.Children.toArray([<DigitGroupSeparator />]),
        },
    ]),
]
