import PropTypes from 'prop-types'
import React, { createContext, useCallback, useContext, useRef } from 'react'

const throwIfNotInitialized = () => {
    throw new Error('ChartContext not yet initialized')
}

export const ChartContext = createContext({
    getChart: throwIfNotInitialized,
    setChart: throwIfNotInitialized,
})

export const useChartContext = () => useContext(ChartContext)

export const ChartProvider = ({ children }) => {
    const chartRef = useRef(null)
    const getChart = useCallback(() => chartRef.current, [])
    const setChart = useCallback((chart = null) => {
        chartRef.current = chart
    }, [])

    return (
        <ChartContext.Provider value={{ getChart, setChart }}>
            {children}
        </ChartContext.Provider>
    )
}

ChartProvider.propTypes = {
    children: PropTypes.node,
}
