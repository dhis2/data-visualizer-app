// Axis
export const FILTER_AXIS_WIDTH = '67%';
export const DIMENSION_AXIS_CONTENT_HEIGHT = '36px';

// Axis (generated)
export const DIMENSION_AXIS_WIDTH = `${100 - parseInt(FILTER_AXIS_WIDTH, 10)}%`;

export default {
    ct: {
        display: 'flex',
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
};
