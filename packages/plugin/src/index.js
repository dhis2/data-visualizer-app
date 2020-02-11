import React from 'react'
import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'

import ChartPlugin from './ChartPlugin'
import PivotPlugin from './PivotPlugin'

const VisualizationPlugin = props => {
    if (
        !props.visualization.type ||
        props.visualization.type === VIS_TYPE_PIVOT_TABLE
    ) {
        return <PivotPlugin {...props} />
    } else {
        return <ChartPlugin {...props} />
    }
}

export default VisualizationPlugin
