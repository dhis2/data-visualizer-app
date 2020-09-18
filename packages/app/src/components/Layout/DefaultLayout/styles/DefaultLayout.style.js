import { LAYOUT_HEIGHT } from '../../styles/style'

// Axis
export const FILTER_AXIS_WIDTH = '50%'
export const DIMENSION_AXIS_CONTENT_HEIGHT = '36px'

// Axis (generated)
export const DIMENSION_AXIS_WIDTH = `${100 - parseInt(FILTER_AXIS_WIDTH, 10)}%`

export default {
    ct: {
        display: 'flex',
        minHeight: LAYOUT_HEIGHT,
    },
    axisGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    axisGroupLeft: {
        flexBasis: DIMENSION_AXIS_WIDTH,
    },
    axisGroupRight: {
        flexBasis: FILTER_AXIS_WIDTH,
    },
    columns: {
        flexBasis: '50%',
    },
    rows: {
        flexBasis: '50%',
    },
    filters: {
        flexBasis: '100%',
    },
}
