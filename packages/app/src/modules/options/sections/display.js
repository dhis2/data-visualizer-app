/* eslint-disable react/jsx-key */
import React from 'react'

import CumulativeValues from '../../../components/VisualizationOptions/Options/CumulativeValues'
import HideEmptyRowItems from '../../../components/VisualizationOptions/Options/HideEmptyRowItems'
import SortOrder from '../../../components/VisualizationOptions/Options/SortOrder'
import getDisplayTemplate from '../templates/display'

export default () => ({
    ...getDisplayTemplate({
        content: React.Children.toArray([
            <CumulativeValues />,
            <HideEmptyRowItems />,
            <SortOrder />,
        ]),
    }),
})
