/* eslint-disable react/jsx-key */
import React from 'react'
import NoSpaceBetweenColumns from '../../../components/VisualizationOptions/Options/NoSpaceBetweenColumns.jsx'
import ShowData from '../../../components/VisualizationOptions/Options/ShowData.jsx'
import ShowSeriesKey from '../../../components/VisualizationOptions/Options/ShowSeriesKey.jsx'
import getChartStyleTemplate from './templates/chartStyle.js'

const defaultContent = [<ShowData />, <ShowSeriesKey />]

const columnContent = [
    <ShowData />,
    <NoSpaceBetweenColumns />,
    <ShowSeriesKey />,
    /* TODO new option <BackgroundLines /> */
]

export default (isColumnBased) => ({
    ...getChartStyleTemplate({
        content: React.Children.toArray([
            isColumnBased ? columnContent : defaultContent,
        ]),
    }),
})
