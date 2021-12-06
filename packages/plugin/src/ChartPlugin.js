import { isSingleValue, createVisualization } from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React, { useRef, useCallback, useEffect } from 'react'

const ChartPlugin = ({
    visualization,
    responses,
    extraOptions,
    legendSets,
    id: renderCounter,
    style,
    onChartGenerated,
    animation: defaultAnimation,
    onToggleContextualMenu,
}) => {
    const canvasRef = useRef(undefined)
    const prevStyle = useRef(style)
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
                isSingleValue(visualization.type) ? 'dhis' : 'highcharts' // output format
            )

            if (isSingleValue(visualization.type)) {
                onChartGenerated(visualizationConfig.visualization)
            } else {
                onChartGenerated(
                    visualizationConfig.visualization.getSVGForExport({
                        sourceHeight: 768,
                        sourceWidth: 1024,
                    })
                )
            }
        },
        [
            canvasRef,
            visualization,
            onChartGenerated,
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

    useEffect(() => {
        if (
            style.width !== prevStyle.current.width ||
            style.height !== prevStyle.current.height
        ) {
            renderVisualization(0)
            prevStyle.current = style
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [style])

    return <div ref={canvasRef} style={style} />
}

ChartPlugin.defaultProps = {
    visualization: {},
    filters: {},
    style: {},
    animation: 200,
    id: null,
    onChartGenerated: Function.prototype,
}

ChartPlugin.propTypes = {
    extraOptions: PropTypes.object.isRequired,
    legendSets: PropTypes.arrayOf(PropTypes.object).isRequired,
    responses: PropTypes.arrayOf(PropTypes.object).isRequired,
    visualization: PropTypes.object.isRequired,
    animation: PropTypes.number,
    id: PropTypes.number,
    style: PropTypes.object,
    onChartGenerated: PropTypes.func,
    onToggleContextualMenu: PropTypes.func,
}

export default ChartPlugin
