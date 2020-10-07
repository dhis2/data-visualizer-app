/* eslint-disable react/jsx-key */
import React from 'react'

import CumulativeValues from '../../../components/VisualizationOptions/Options/CumulativeValues'
import HideEmptyRowItems from '../../../components/VisualizationOptions/Options/HideEmptyRowItems'
import PercentStackedValues from '../../../components/VisualizationOptions/Options/PercentStackedValues'
import SortOrder from '../../../components/VisualizationOptions/Options/SortOrder'
import getDisplayTemplate from '../templates/display'

const defaultContent = [
    <CumulativeValues />,
    <HideEmptyRowItems />,
    <SortOrder />,
]

const stackedContent = [<PercentStackedValues />, ...defaultContent]

export default isStacked => ({
    ...getDisplayTemplate({
        content: React.Children.toArray(
            isStacked ? stackedContent : defaultContent
        ),
    }),
})
