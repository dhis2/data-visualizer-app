/* eslint-disable react/jsx-key */
import React from 'react'
import CumulativeValues from '../../../components/VisualizationOptions/Options/CumulativeValues.js'
import HideEmptyRowItems from '../../../components/VisualizationOptions/Options/HideEmptyRowItems.js'
import PercentStackedValues from '../../../components/VisualizationOptions/Options/PercentStackedValues.js'
import SkipRounding from '../../../components/VisualizationOptions/Options/SkipRounding.js'
import SortOrder from '../../../components/VisualizationOptions/Options/SortOrder.js'
import getDisplayTemplate from './templates/display.js'

const defaultContent = [
    <CumulativeValues />,
    <HideEmptyRowItems />,
    <SortOrder />,
    <SkipRounding />,
]

const stackedContent = [<PercentStackedValues />, ...defaultContent]

export default isStacked => ({
    ...getDisplayTemplate({
        content: React.Children.toArray(
            isStacked ? stackedContent : defaultContent
        ),
    }),
})
