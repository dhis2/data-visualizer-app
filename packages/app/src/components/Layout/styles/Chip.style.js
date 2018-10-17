import * as layoutStyle from './style';

export const styles = {
    chipWrapper: {
        display: 'flex',
        margin: layoutStyle.CHIP_MARGIN,
    },
    chip: {
        maxHeight: layoutStyle.CHIP_HEIGHT,
        padding: layoutStyle.CHIP_PADDING,
        fontSize: layoutStyle.CHIP_FONT_SIZE,
        fontWeight: layoutStyle.CHIP_FONT_WEIGHT,
        backgroundColor: layoutStyle.CHIP_BACKGROUND_COLOR,
        color: layoutStyle.CHIP_COLOR,
        borderRadius: layoutStyle.CHIP_BORDER_RADIUS,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

styles.chipLeft = {
    ...styles.chip,
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
};

styles.chipRight = {
    ...styles.chip,
    paddingLeft: '0px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
};
