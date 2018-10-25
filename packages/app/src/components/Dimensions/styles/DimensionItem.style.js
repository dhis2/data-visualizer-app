import { colors } from '../../../utils/colors';

export const styles = {
    wrapper: {
        display: 'flex',
        position: 'static',
    },
    text: {
        color: colors.black,
        cursor: 'pointer',
        userSelect: 'none',
        wordBreak: 'break-all',
        paddingTop: 3,
        fontSize: 16,
        maxWidth: 195,
    },
    itemContainer: {
        display: 'flex',
        minHeight: 24,
        marginTop: 7,
        marginBottom: 7,
    },
    fixedDimensionIcon: {
        paddingLeft: '6px',
        position: 'relative',
        top: '6px',
    },
    genericDimensionIcon: {
        paddingLeft: '9px',
        paddingRight: '9px',
        position: 'relative',
        top: '9px',
    },
};
