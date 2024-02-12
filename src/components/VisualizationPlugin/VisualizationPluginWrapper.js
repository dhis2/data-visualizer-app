import React, { useCallback, useState } from 'react'
import { VisualizationPlugin } from '../VisualizationPlugin/VisualizationPlugin.js'

// handle internal state for features that need to work without the app's Redux store
const VisualizationPluginWrapper = (props) => {
    const [pluginProps, setPluginProps] = useState(props)

    const onDataSorted = useCallback(
        (sorting) => {
            const newSorting = {
                dimension: sorting.dimension,
                direction: sorting.direction.toUpperCase(),
            }

            setPluginProps({
                ...pluginProps,
                visualization: {
                    ...pluginProps.visualization,
                    sorting: [newSorting],
                },
            })
        },
        [pluginProps]
    )

    return <VisualizationPlugin {...pluginProps} onDataSorted={onDataSorted} />
}

export { VisualizationPluginWrapper }
