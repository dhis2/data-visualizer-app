import { colors } from '../../../modules/colors';

export const styles = {
    wrapper: {
        display: 'flex',
        position: 'static',
    },
    text: {
        color: colors.black,
        userSelect: 'none',
        wordBreak: 'break-all',
        fontSize: 16,
        maxWidth: 195,
        alignSelf: 'center',
    },
    itemContainer: {
        display: 'flex',
        minHeight: 24,
        marginTop: 7,
        marginBottom: 7,
    },
    fixedDimensionIcon: {
        paddingLeft: '6px',
        paddingBottom: '2px',
    },
    genericDimensionIcon: {
        paddingLeft: '9px',
        paddingRight: '9px',
    },
};
