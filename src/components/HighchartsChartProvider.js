import PropTypes from 'prop-types'
import React, { createContext, useCallback, useContext, useRef } from 'react'

const throwIfUnitialized = () => {
    throw new Error('HighchartsChartContext not yet initialized')
}

export const HighchartsChartContext = createContext({
    getChartInstance: throwIfUnitialized,
    setChartInstance: throwIfUnitialized,
})

export const useHighchartsChartContext = () =>
    useContext(HighchartsChartContext)

export const HighchartsChartProvider = ({ children }) => {
    const highChartsChartRef = useRef(null)
    const getChartInstance = useCallback(() => highChartsChartRef.current, [])
    const setChartInstance = useCallback((chartInstance = null) => {
        highChartsChartRef.current = chartInstance
    }, [])

    return (
        <HighchartsChartContext.Provider
            value={{ getChartInstance, setChartInstance }}
        >
            {children}
        </HighchartsChartContext.Provider>
    )
}

HighchartsChartProvider.propTypes = {
    children: PropTypes.node,
}
