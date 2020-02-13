import React, { useEffect, useState } from 'react'
import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'

import { apiFetchLegendSet } from './api/legendSets'
import ChartPlugin from './ChartPlugin'
import PivotPlugin from './PivotPlugin'

const VisualizationPlugin = props => {
    const engine = useDataEngine()
    const [legendSet, setLegendSet] = useState(null)

    useEffect(() => {
        const fetchLegendSet = async engine => {
            if (
                props.visualization.legendSet &&
                props.visualization.legendSet.id
            ) {
                const response = await apiFetchLegendSet(
                    engine,
                    props.visualization.legendSet.id
                )

                if (response && response.legendSet) {
                    setLegendSet(response.legendSet)
                }
            }
        }

        fetchLegendSet(engine)
    }, [props.visualization.legendSet]) // eslint-disable-line react-hooks/exhaustive-deps

    if (
        !props.visualization.type ||
        props.visualization.type === VIS_TYPE_PIVOT_TABLE
    ) {
        return <PivotPlugin {...props} legendSet={legendSet} />
    } else {
        return <ChartPlugin {...props} legendSet={legendSet} />
    }
}

export default VisualizationPlugin
