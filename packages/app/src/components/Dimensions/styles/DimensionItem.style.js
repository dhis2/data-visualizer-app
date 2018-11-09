import { colors } from '../../../modules/colors';

export const styles = {
    text: {
        color: colors.black,
        userSelect: 'none',
        cursor: 'pointer',
        wordBreak: 'break-word',
        fontSize: '16px',
        maxWidth: '195px',
        alignSelf: 'center',
    },
    itemContainer: {
        display: 'flex',
        marginTop: '7px',
        marginBottom: '7px',
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
