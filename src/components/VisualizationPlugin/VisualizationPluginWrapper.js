import { CenteredContent, CircularLoader, ComponentCover } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { VisualizationPlugin } from '../VisualizationPlugin/VisualizationPlugin.js'

// handle internal state for features that need to work without the app's Redux store
const VisualizationPluginWrapper = (props) => {
    const [pluginProps, setPluginProps] = useState(props)
    const [isLoading, setIsLoading] = useState(true)

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

    useEffect(() => {
        setPluginProps({
            filters: props.filters,
            displayProperty: props.displayProperty,
            visualization: props.visualization,
            onResponsesReceived: props.onResponsesReceived,
            style: props.style,
        })
    }, [
        props.filters,
        props.displayProperty,
        props.visualization,
        props.onResponsesReceived,
        props.style,
    ])

    useEffect(() => {
        setIsLoading(true)
    }, [props.filters, props.displayProperty, props.visualization])

    const onLoadingComplete = () => setIsLoading(false)

    return (
        <>
            {isLoading && (
                <ComponentCover>
                    <CenteredContent>
                        <CircularLoader />
                    </CenteredContent>
                </ComponentCover>
            )}
            <VisualizationPlugin
                {...pluginProps}
                onDataSorted={onDataSorted}
                onLoadingComplete={onLoadingComplete}
                fromWrapper={true}
            />
        </>
    )
}

VisualizationPluginWrapper.propTypes = {
    className: PropTypes.string,
    displayProperty: PropTypes.string,
    filters: PropTypes.object,
    style: PropTypes.object,
    visualization: PropTypes.object,
    onResponsesReceived: PropTypes.func,
}

export { VisualizationPluginWrapper }
