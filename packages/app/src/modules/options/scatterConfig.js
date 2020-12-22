import React from 'react'

import getSeriesTab from './tabs/series'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'
import getColorSetSection from './sections/colorSet'
import getVerticalAxisSection from './sections/verticalAxis'
import getHorizontalAxisSection from './sections/horizontalAxis'
import getAxesTab from './tabs/axes'
import getOutliersTab from './tabs/outliers'

export default () => [
    getAxesTab([getVerticalAxisSection(), getHorizontalAxisSection()]),
    getSeriesTab(),
    getStyleTab([getTitlesSection(), getColorSetSection()]),
    getOutliersTab([
        {
            key: 'outlier-analysis',
            content: React.Children.toArray([]),
        },
    ]),
]
