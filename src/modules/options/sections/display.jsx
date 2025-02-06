/* eslint-disable react/jsx-key */
import React from 'react'
import CumulativeValues from '../../../components/VisualizationOptions/Options/CumulativeValues.jsx'
import HideEmptyRowItems from '../../../components/VisualizationOptions/Options/HideEmptyRowItems.jsx'
import PercentStackedValues from '../../../components/VisualizationOptions/Options/PercentStackedValues.jsx'
import SkipRounding from '../../../components/VisualizationOptions/Options/SkipRounding.jsx'
import SortOrder from '../../../components/VisualizationOptions/Options/SortOrder.jsx'
import getDisplayTemplate from './templates/display.js'

const defaultContent = [
    <CumulativeValues />,
    <HideEmptyRowItems />,
    <SortOrder />,
    <SkipRounding />,
]

const stackedContent = [<PercentStackedValues />, ...defaultContent]

export default (isStacked) => ({
    ...getDisplayTemplate({
        content: React.Children.toArray(
            isStacked ? stackedContent : defaultContent
        ),
    }),
})
