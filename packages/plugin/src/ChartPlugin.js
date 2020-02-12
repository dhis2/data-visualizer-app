import React, { useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import {
    isYearOverYear,
    isSingleValue,
    createVisualization,
} from '@dhis2/analytics'

import {
    apiFetchAnalytics,
    apiFetchAnalyticsForYearOverYear,
} from './api/analytics'
import { getOptionsForRequest } from './modules/options'
import { computeGenericPeriodNames } from './modules/analytics'

const getRequestOptions = (visualization, filters) => {
    const options = getOptionsForRequest().reduce((map, [option, props]) => {
        // only add parameter if value !== default
        if (
            visualization[option] !== undefined &&
            visualization[option] !== props.defaultValue
        ) {
            map[option] = visualization[option]
        }

        return map
    }, {})

    // interpretation filter
    if (filters.relativePeriodDate) {
        options.relativePeriodDate = filters.relativePeriodDate
    }

    // global filters
    // userOrgUnit
    if (filters.userOrgUnit && filters.userOrgUnit.length) {
        const ouIds = filters.userOrgUnit.map(
            ouPath => ouPath.split('/').slice(-1)[0]
        )

        options.userOrgUnit = ouIds.join(';')
    }

    return options
}

const fetchData = async ({ visualization, filters, d2, forDashboard }) => {
    const options = getRequestOptions(visualization, filters)

    const extraOptions = {
        dashboard: forDashboard,
        noData: { text: i18n.t('No data') },
    }

    if (isYearOverYear(visualization.type)) {
        const {
            responses,
            yearlySeriesLabels,
        } = await apiFetchAnalyticsForYearOverYear(d2, visualization, options)

        return {
            responses,
            extraOptions: {
                ...extraOptions,
                yearlySeries: yearlySeriesLabels,
                xAxisLabels: computeGenericPeriodNames(responses),
            },
        }
    }

    const responses = await apiFetchAnalytics(d2, visualization, options)

    return {
        responses,
        extraOptions,
    }
}

const ChartPlugin = ({
    visualization,
    filters,
    id,
    style,
    d2,
    forDashboard,
    onResponsesReceived,
    onChartGenerated,
    onError,
    onLoadingComplete,
    animation: defaultAnimation,
}) => {
    const canvasRef = useRef(undefined)
    const fetchResult = useRef(undefined)

    const renderVisualization = useCallback(
        animation => {
            if (!fetchResult.current) return
            const { responses, extraOptions } = fetchResult.current

            const visualizationConfig = createVisualization(
                responses,
                visualization,
                canvasRef.current,
                {
                    ...extraOptions,
                    animation,
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
        [canvasRef, visualization, onChartGenerated]
    )

    const doFetch = useCallback(
        (visualization, filters, forDashboard) => {
            fetchData({
                visualization,
                filters,
                d2,
                forDashboard,
            })
                .then(result => {
                    if (result.responses.length) {
                        onResponsesReceived(result.responses)
                    }

                    fetchResult.current = result
                    renderVisualization(defaultAnimation)
                    onLoadingComplete()
                })
                .catch(error => {
                    onError(error)
                })
        },
        [
            d2,
            onResponsesReceived,
            onLoadingComplete,
            onError,
            renderVisualization,
            defaultAnimation,
        ]
    )

    useEffect(() => {
        doFetch(visualization, filters, forDashboard)
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [visualization, filters, forDashboard])

    useEffect(() => {
        renderVisualization(0)
    }, [id, style]) /* eslint-disable-line react-hooks/exhaustive-deps */

    return <div ref={canvasRef} style={style} />
}

ChartPlugin.defaultProps = {
    visualization: {},
    filters: {},
    forDashboard: false,
    style: {},
    animation: 200,
    onError: Function.prototype,
    onChartGenerated: Function.prototype,
    onLoadingComplete: Function.prototype,
    onResponsesReceived: Function.prototype,
}

ChartPlugin.propTypes = {
    d2: PropTypes.object.isRequired,
    visualization: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    animation: PropTypes.number,
    filters: PropTypes.object,
    forDashboard: PropTypes.bool,
    id: PropTypes.number,
    style: PropTypes.object,
    onChartGenerated: PropTypes.func,
    onLoadingComplete: PropTypes.func,
    onResponsesReceived: PropTypes.func,
}

export default ChartPlugin
