import { createVisualization } from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React, { useRef, useCallback, useEffect } from 'react'
import styles from './styles/ChartPlugin.module.css'

const VISUALIZATION_PROP_DEFAULT = {}

const ChartPlugin = ({
    visualization = VISUALIZATION_PROP_DEFAULT,
    responses,
    extraOptions,
    legendSets,
    id: renderCounter = null,
    onChartGenerated = Function.prototype,
    animation: defaultAnimation = 200,
    onToggleContextualMenu,
}) => {
    const canvasRef = useRef(undefined)
    const prevRenderCounter = useRef(renderCounter)

    const renderVisualization = useCallback(
        (animation) => {
            const visualizationConfig = createVisualization(
                responses,
                visualization,
                canvasRef.current,
                {
                    ...extraOptions,
                    animation,
                    legendSets,
                    onToggleContextualMenu,
                },
                undefined,
                undefined,
                'highcharts' // output format
            )

            onChartGenerated(visualizationConfig.visualization)
        },
        [
            canvasRef,
            visualization,
            onChartGenerated,
            onToggleContextualMenu,
            responses,
            extraOptions,
            legendSets,
        ]
    )

    useEffect(() => {
        renderVisualization(defaultAnimation)

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [visualization, responses, extraOptions])

    useEffect(() => {
        if (renderCounter !== prevRenderCounter.current) {
            renderVisualization(0)
            prevRenderCounter.current = renderCounter
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [renderCounter])

    return <div ref={canvasRef} className={styles.container} />
}

ChartPlugin.propTypes = {
    extraOptions: PropTypes.object.isRequired,
    legendSets: PropTypes.arrayOf(PropTypes.object).isRequired,
    responses: PropTypes.arrayOf(PropTypes.object).isRequired,
    visualization: PropTypes.object.isRequired,
    animation: PropTypes.number,
    id: PropTypes.number,
    onChartGenerated: PropTypes.func,
    onToggleContextualMenu: PropTypes.func,
}

export default ChartPlugin
