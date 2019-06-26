import { colors } from '@dhis2/analytics';

import * as layoutStyle from './style';

export const styles = {
    chipWrapper: {
        display: 'flex',
        margin: layoutStyle.CHIP_MARGIN,
        backgroundColor: layoutStyle.CHIP_BACKGROUND_COLOR,
        borderRadius: layoutStyle.CHIP_BORDER_RADIUS,
        alignItems: 'center',
    },
    chip: {
        padding: layoutStyle.CHIP_PADDING,
        fontSize: layoutStyle.CHIP_FONT_SIZE,
        fontWeight: layoutStyle.CHIP_FONT_WEIGHT,
        color: layoutStyle.CHIP_COLOR,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    chipEmpty: {
        backgroundColor: colors.greyLight,
    },
    fixedDimensionIcon: {
        paddingRight: '6px',
    },
    iconWrapper: {
        paddingRight: '6px',
        display: 'flex',
        alignItems: 'center',
    },
};

styles.chipLeft = {
    ...styles.chip,
    display: 'flex',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    alignItems: 'center',
};

styles.chipRight = {
    ...styles.chip,
    paddingLeft: '0px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
};
