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

// The legend line sample is ~2px tall: accept clicks a few px above and below it.
// Vertical only, so clicks on the label still toggle the series.
const LEGEND_LINE_HIT_PADDING = 6
const isNearLine = (line, { clientX, clientY }) => {
    const rect = line.element.getBoundingClientRect()

    return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top - LEGEND_LINE_HIT_PADDING &&
        clientY <= rect.bottom + LEGEND_LINE_HIT_PADDING
    )
}

// PROTOTYPE: clicking a bar/slice/line or its legend symbol opens a colour popover for its colour slot
const attachSeriesClick = (chart, onSeriesClick) => {
    const dataSeries = chart.series.filter(isDataSeries)
    const isPie = dataSeries[0]?.type === 'pie'
    // Read lazily: series.update recreates pie points
    const getTargets = () => (isPie ? dataSeries[0].points : dataSeries)

    const open = (index, { clientX, clientY }) => {
        const target = getTargets()[index]

        onSeriesClick({
            // Lines have no point graphic, so anchor on the click itself
            position: { x: clientX, y: clientY },
            index,
            color: typeof target.color === 'string' ? target.color : '#000000',
            preview: (color) => target.update({ color }, true, false),
        })
    }

    dataSeries.forEach((series, seriesIndex) =>
        series.update(
            {
                cursor: 'pointer',
                // Area fills only take clicks on their top edge otherwise.
                // Lines have no area path, so their tracker would be empty.
                trackByArea: series.type.startsWith('area'),
                events: {
                    click: (event) =>
                        open(isPie ? event.point.index : seriesIndex, event),
                },
            },
            false
        )
    )

    chart.redraw(false)

    // Capture phase: runs before the legend item's show/hide toggle, so the
    // symbol opens the picker while the label keeps toggling
    chart.container.addEventListener(
        'click',
        (event) => {
            const index = getTargets().findIndex(
                ({ legendItem }) =>
                    legendItem?.symbol?.element.contains(event.target) ||
                    (legendItem?.line && isNearLine(legendItem.line, event))
            )

            if (index !== -1) {
                event.stopPropagation()
                open(index, event)
            }
        },
        true
    )
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
    const prevResponses = useRef(undefined)

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
        // Only animate when new data arrives, not when options are restyled
        renderVisualization(
            responses === prevResponses.current ? 0 : defaultAnimation
        )
        prevResponses.current = responses

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
