import {
    colorSets,
    COLOR_SET_DEFAULT,
    createVisualization,
} from '@dhis2/analytics'
import PropTypes from 'prop-types'
import React, { useRef, useCallback, useEffect } from 'react'
import {
    COLOR_SET_CUSTOM,
    OPTION_CUSTOM_COLORS,
} from '../../modules/options.js'
import styles from './styles/ChartPlugin.module.css'

const VISUALIZATION_PROP_DEFAULT = {}

// Colour slots follow data series order; trend lines and helper series don't take one
const isDataSeries = (series) =>
    !series.options.linkedTo && !series.options.custom?.isTwoCategoryFakeSerie

// PROTOTYPE: clicking a bar/slice opens a colour popover for its colour slot
const attachSeriesClick = (chart, onSeriesClick) => {
    const dataSeries = chart.series.filter(isDataSeries)

    dataSeries.forEach((series, seriesIndex) =>
        series.update(
            {
                cursor: 'pointer',
                events: {
                    click: ({ point }) => {
                        const isPie = series.type === 'pie'
                        const target = isPie ? point : series

                        onSeriesClick({
                            element: point.graphic?.element,
                            index: isPie ? point.index : seriesIndex,
                            name: isPie ? point.name : series.name,
                            color:
                                typeof target.color === 'string'
                                    ? target.color
                                    : '#000000',
                            preview: (color) =>
                                target.update({ color }, true, false),
                        })
                    },
                },
            },
            false
        )
    )

    chart.redraw(false)
}

const ChartPlugin = ({
    visualization = VISUALIZATION_PROP_DEFAULT,
    responses,
    extraOptions,
    legendSets,
    id: renderCounter = null,
    onChartGenerated = Function.prototype,
    animation: defaultAnimation = 200,
    onToggleContextualMenu,
    onSeriesClick,
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
                    ...(visualization.colorSet === COLOR_SET_CUSTOM && {
                        colors:
                            visualization[OPTION_CUSTOM_COLORS] ||
                            colorSets[COLOR_SET_DEFAULT].colors,
                    }),
                    animation,
                    legendSets,
                    onToggleContextualMenu,
                },
                undefined,
                undefined,
                'highcharts' // output format
            )

            if (onSeriesClick) {
                attachSeriesClick(
                    visualizationConfig.visualization,
                    onSeriesClick
                )
            }

            onChartGenerated(visualizationConfig.visualization)
        },
        [
            canvasRef,
            visualization,
            onChartGenerated,
            onToggleContextualMenu,
            onSeriesClick,
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
    onSeriesClick: PropTypes.func,
    onToggleContextualMenu: PropTypes.func,
}

export default ChartPlugin
