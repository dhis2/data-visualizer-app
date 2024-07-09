import PropTypes from 'prop-types'
import React, { createContext, useCallback, useContext, useRef } from 'react'

const throwIfNotInitialized = () => {
    throw new Error('ChartContext not yet initialized')
}

export const ChartContext = createContext({
    getChartInstance: throwIfNotInitialized,
    setChartInstance: throwIfNotInitialized,
    isHighchartsChartInstance: throwIfNotInitialized,
})

export const useChartContext = () => useContext(ChartContext)

export const ChartProvider = ({ children }) => {
    const chartRef = useRef(null)
    const getChart = useCallback(() => chartRef.current, [])
    const isHighchartsChartInstance = useCallback(
        () => chartRef.current && typeof chartRef.current !== 'string',
        []
    )
    const setChart = useCallback((chart = null) => {
        chartRef.current = chart
    }, [])

    return (
        <ChartContext.Provider
            value={{ getChart, isHighchartsChartInstance, setChart }}
        >
            {children}
        </ChartContext.Provider>
    )
}

ChartProvider.propTypes = {
    children: PropTypes.node,
}
