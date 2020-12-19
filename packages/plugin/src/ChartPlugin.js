import React, { useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isSingleValue, createVisualization } from '@dhis2/analytics'

const ChartPlugin = ({
    visualization,
    responses,
    extraOptions,
    legendSets,
    id: renderCounter,
    style,
    onChartGenerated,
    animation: defaultAnimation,
}) => {
    const canvasRef = useRef(undefined)

    const renderVisualization = useCallback(
        animation => {
            const visualizationConfig = createVisualization(
                responses,
                visualization,
                canvasRef.current,
                {
                    ...extraOptions,
                    animation,
                    legendSets,
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
        renderCounter !== null && renderVisualization(0)

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [renderCounter, style])

    return <div ref={canvasRef} style={style} />
}

ChartPlugin.defaultProps = {
    visualization: {},
    filters: {},
    style: {},
    animation: 200,
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
}

export default ChartPlugin
