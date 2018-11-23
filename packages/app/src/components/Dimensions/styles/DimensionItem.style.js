import { colors } from '../../../modules/colors';

export const styles = {
    text: {
        color: colors.black,
        userSelect: 'none',
        cursor: 'pointer',
        wordBreak: 'break-word',
        fontSize: '14px',
        maxWidth: '195px',
        alignSelf: 'center',
    },
    textDeactivated: {
        cursor: 'auto',
        color: colors.grey,
    },
    listItem: {
        display: 'flex',
        marginTop: 3,
        marginBottom: 3,
    },
    selectedListItem: {
        backgroundColor: colors.accentSecondaryTransparent,
        fontWeight: 500,
    },
    fixedDimensionIcon: {
        paddingLeft: '6px',
        paddingBottom: '2px',
    },
    dynamicDimensionIcon: {
        paddingLeft: '9px',
        paddingRight: '9px',
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: '8px',
        paddingLeft: '8px',
    },
};
