/* eslint-disable react/jsx-key */
import React from 'react'
import NoSpaceBetweenColumns from '../../../components/VisualizationOptions/Options/NoSpaceBetweenColumns.js'
import ShowData from '../../../components/VisualizationOptions/Options/ShowData.js'
import ShowSeriesKey from '../../../components/VisualizationOptions/Options/ShowSeriesKey.js'
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
