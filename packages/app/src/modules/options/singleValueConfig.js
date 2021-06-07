/* eslint-disable react/jsx-key */
import React from 'react'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import getAdvancedSection from './sections/advanced'
import getDisplayTemplate from './sections/templates/display'
import getTitlesSection from './sections/titles'
import getDataTab from './tabs/data'
import getLegendTab from './tabs/legend'
import getSeriesTab from './tabs/series'
import getStyleTab from './tabs/style'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([<SkipRounding />]),
        }),
        getAdvancedSection(),
    ]),
    getLegendTab({ hideStyleOptions: true }),
    getSeriesTab(),
    getStyleTab([
        getTitlesSection(),
        {
            key: 'style-section-2',
            content: React.Children.toArray([<DigitGroupSeparator />]),
        },
    ]),
]
