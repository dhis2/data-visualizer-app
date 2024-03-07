import { CenteredContent, CircularLoader, Layer } from '@dhis2/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { VisualizationPlugin } from '../VisualizationPlugin/VisualizationPlugin.js'

// handle internal state for features that need to work without the app's Redux store
const VisualizationPluginWrapper = (props) => {
    const [pluginProps, setPluginProps] = useState(props)
    const [isLoading, setIsLoading] = useState(false)

    const onDataSorted = useCallback(
        (sorting) => {
            setIsLoading(true)

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

    useEffect(() => setPluginProps(props), [props])

    const onLoadingComplete = () => setIsLoading(false)

    return (
        <>
            {isLoading && (
                <Layer>
                    <CenteredContent>
                        <CircularLoader />
                    </CenteredContent>
                </Layer>
            )}
            <VisualizationPlugin
                {...pluginProps}
                onDataSorted={onDataSorted}
                onLoadingComplete={onLoadingComplete}
            />
        </>
    )
}

export { VisualizationPluginWrapper }
