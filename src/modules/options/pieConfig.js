/* eslint-disable react/jsx-key */
import React from 'react'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.js'
import getAdvancedSection from './sections/advanced.js'
import getColorSetSection from './sections/colorSet.js'
import getDisplayTemplate from './sections/templates/display.js'
import getTitlesSection from './sections/titles.js'
import getDataTab from './tabs/data.js'
import getLegendTab from './tabs/legend.js'
import getLimitValuesTab from './tabs/limitValues.js'
import getSeriesTab from './tabs/series.js'
import getStyleTab from './tabs/style.js'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([<SkipRounding />]),
        }),
        getAdvancedSection(),
    ]),
    getLegendTab({ hideStyleOptions: true, hideByDataItemStrategy: true }),
    getSeriesTab(),
    getStyleTab([getTitlesSection(), getColorSetSection()]),
    getLimitValuesTab(),
]
