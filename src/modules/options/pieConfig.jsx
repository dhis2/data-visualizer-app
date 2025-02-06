import React from 'react'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.jsx'
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
