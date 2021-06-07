/* eslint-disable react/jsx-key */
import React from 'react'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import getAdvancedSection from './sections/advanced'
import getColorSetSection from './sections/colorSet'
import getDisplayTemplate from './sections/templates/display'
import getTitlesSection from './sections/titles'
import getDataTab from './tabs/data'
import getLimitValuesTab from './tabs/limitValues'
import getSeriesTab from './tabs/series'
import getStyleTab from './tabs/style'

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
