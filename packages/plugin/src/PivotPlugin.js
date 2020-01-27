import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { apiFetchAnalytics } from './api/analytics'
import { getOptionsForRequest } from './modules/options'
import LoadingMask from './widgets/LoadingMask'

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
    config: visualization,
    filters,
    style,
    onError,
    onResponsesReceived,
    id,
    d2,
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)

    const remappedOptions = {
        showColTotals: visualization.colTotals,
        showRowTotals: visualization.rowTotals,
        showColSubTotals: visualization.colSubTotals,
        showRowSubTotals: visualization.rowSubTotals,
    }

    useEffect(() => {
        const options = getRequestOptions(visualization, filters)
        apiFetchAnalytics(d2, visualization, options)
            .then(responses => {
                if (!responses.length) {
                    return
                }
                if (onResponsesReceived) {
                    onResponsesReceived(responses)
                }

                setData(responses[0].response)
                setIsLoading(false)
            })
            .catch(error => {
                onError(error)
            })

        // TODO: cancellation
    }, [
        visualization,
        filters,
        id /* TODO: short-circuit when id changes? */,
        onResponsesReceived,
        onError,
        d2,
    ])

    return (
        <div style={{ width: '100%', height: '100%', ...style }}>
            {isLoading ? (
                <LoadingMask />
            ) : (
                <PivotTable
                    visualization={visualization}
                    data={data}
                    options={remappedOptions}
                />
            )}
        </div>
    )
}

PivotPlugin.defaultProps = {
    config: {},
    filters: {},
    style: {},
    onError: Function.prototype,
    onResponsesReceived: Function.prototype,
}

PivotPlugin.propTypes = {
    config: PropTypes.object.isRequired,
    d2: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired,
    filters: PropTypes.object,
    id: PropTypes.number,
    style: PropTypes.object,
    onResponsesReceived: PropTypes.func,
}

export default PivotPlugin
