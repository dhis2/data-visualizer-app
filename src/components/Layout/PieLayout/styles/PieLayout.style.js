// Axis
export const FILTER_AXIS_WIDTH = '70%'

// Axis (generated)
export const DIMENSION_AXIS_WIDTH = `${100 - parseInt(FILTER_AXIS_WIDTH, 10)}%`

export default {
    axisGroupLeft: {
        flexBasis: DIMENSION_AXIS_WIDTH,
    },
    axisGroupRight: {
        flexBasis: FILTER_AXIS_WIDTH,
    },
}
