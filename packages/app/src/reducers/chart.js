export const SET_CHART = 'SET_CHART'

export const DEFAULT_CHART = null

export default (state = DEFAULT_CHART, action) => {
    switch (action.type) {
        case SET_CHART: {
            return action.value
        }
        default:
            return state
    }
}

export const sGetChart = (state) => state.chart
