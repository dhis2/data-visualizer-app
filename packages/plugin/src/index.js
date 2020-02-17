import React, { useEffect, useState } from 'react'
import { VIS_TYPE_PIVOT_TABLE } from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'

import { apiFetchLegendSet } from './api/legendSets'
import ChartPlugin from './ChartPlugin'
import PivotPlugin from './PivotPlugin'

const VisualizationPlugin = props => {
    const engine = useDataEngine()
    const [legendSet, setLegendSet] = useState(null)

    const hasLegendSet =
        props.visualization.legendSet && props.visualization.legendSet.id

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
    }, [engine, props.visualization.legendSet])

    if (hasLegendSet && !legendSet) {
        // Until one of the children is rendered and calls onLoadingComplete,
        // the app will continue to render the loading spinner
        return null
    }

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
