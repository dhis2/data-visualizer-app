/* eslint-disable react/jsx-key */
import React from 'react'

import HideLegend from '../../../components/VisualizationOptions/Options/HideLegend'
import NoSpaceBetweenColumns from '../../../components/VisualizationOptions/Options/NoSpaceBetweenColumns'
import ShowData from '../../../components/VisualizationOptions/Options/ShowData'
import getChartStyleTemplate from '../templates/chartStyle'

export default () => ({
    ...getChartStyleTemplate({
        content: React.Children.toArray([
            <ShowData />,
            <NoSpaceBetweenColumns />,
            <HideLegend />,
            /* TODO new option <BackgroundLines /> */
        ]),
    }),
})
