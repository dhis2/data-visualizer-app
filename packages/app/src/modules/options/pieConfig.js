/* eslint-disable react/jsx-key */
import React from 'react'

import getColorSetSection from './sections/colorSet'
import getSeriesTab from './tabs/series'
import getDataTab from './tabs/data'
import getAdvancedSection from './sections/advanced'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'
import getDisplayTemplate from './sections/templates/display'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import getLimitValuesTab from './tabs/limitValues'

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
