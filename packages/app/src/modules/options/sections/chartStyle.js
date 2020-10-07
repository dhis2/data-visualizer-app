/* eslint-disable react/jsx-key */
import React from 'react'

import HideLegend from '../../../components/VisualizationOptions/Options/HideLegend'
import NoSpaceBetweenColumns from '../../../components/VisualizationOptions/Options/NoSpaceBetweenColumns'
import ShowData from '../../../components/VisualizationOptions/Options/ShowData'
import getChartStyleTemplate from '../templates/chartStyle'

const defaultContent = [<ShowData />, <HideLegend />]

const columnContent = [
    <ShowData />,
    <NoSpaceBetweenColumns />,
    <HideLegend />,
    /* TODO new option <BackgroundLines /> */
]

export default isColumnBased => ({
    ...getChartStyleTemplate({
        content: React.Children.toArray([
            isColumnBased ? columnContent : defaultContent,
        ]),
    }),
})
