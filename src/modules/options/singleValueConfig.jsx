import React from 'react'
import DataIcon from '../../components/VisualizationOptions/Options/DataIcon.jsx'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator.jsx'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.jsx'
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
