import { FILTER_AXIS_WIDTH } from '../../DefaultLayout/styles/DefaultLayout.style.js'

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
