import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { apiFetchAnalytics } from './api/analytics'
import { getOptionsForRequest } from './modules/options'

import { PivotTable } from '@dhis2/analytics'

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

const PivotPlugin = ({
    config,
    filters,
    style,
    onError,
    onResponsesReceived,
    d2,
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [visualization, setVisualization] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        const options = getRequestOptions(config, filters)
        apiFetchAnalytics(d2, config, options)
            .then(responses => {
                if (!responses.length) {
                    return
                }
                if (onResponsesReceived) {
                    onResponsesReceived(responses)
                }
                setVisualization(config)
                setData(responses[0].response)
                onLoadingComplete()
            })
            .catch(error => {
                onError(error)
            })

        // TODO: cancellation
    }, [config, filters, onResponsesReceived, onError, d2])

    return (
        <div style={{ width: '100%', height: '100%', ...style }}>
            <PivotTable visualization={visualization} data={data} />
        </div>
    )
}

PivotPlugin.defaultProps = {
    config: {},
    filters: {},
    style: {},
    onError: Function.prototype,
    onLoadingComplete: Function.prototype,
    onResponsesReceived: Function.prototype,
}

PivotPlugin.propTypes = {
    config: PropTypes.object.isRequired,
    d2: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    filters: PropTypes.object,
    style: PropTypes.object,
    onLoadingComplete: PropTypes.func,
    onResponsesReceived: PropTypes.func,
}

export default PivotPlugin
