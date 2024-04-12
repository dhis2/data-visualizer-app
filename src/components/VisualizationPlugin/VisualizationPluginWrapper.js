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
            displayProperty: props.displayProperty,
            visualization: props.visualization,
            filters: props.filters,
            forDashboard: props.forDashboard,
            id: props.id,
            style: props.style,
            onChartGenerated: props.onChartGenerated,
            onDrill: props.onDrill,
            onError: props.onError,
            onResponsesReceived: props.onResponsesReceived,
        })
    }, [
        props.displayProperty,
        props.visualization,
        props.filters,
        props.forDashboard,
        props.id,
        props.style,
        props.onChartGenerated,
        props.onDrill,
        props.onError,
        props.onResponsesReceived,
    ])

    // set loading state only for props that will cause
    // VisualizationPlugin to fetch and call onLoadingComplete
    useEffect(() => {
        setIsLoading(true)
    }, [props.filters, props.forDashboard, props.visualization])

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
    displayProperty: PropTypes.string.isRequired,
    visualization: PropTypes.object.isRequired,
    className: PropTypes.string,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    id: PropTypes.number,
    style: PropTypes.object,
    onChartGenerated: PropTypes.func,
    onDrill: PropTypes.func,
    onError: PropTypes.func,
    onResponsesReceived: PropTypes.func,
}

export { VisualizationPluginWrapper }
