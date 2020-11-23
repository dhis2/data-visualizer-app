/* eslint-disable react/jsx-key */
import React from 'react'

import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator'
import getSeriesTab from './tabs/series'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'
import getDisplayTemplate from './sections/templates/display'
import getLegendTab from './tabs/legend'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'

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
