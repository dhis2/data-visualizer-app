import { colors } from '../../../../modules/colors';

export const styles = {
    toolTip: {
        color: colors.white,
        backgroundColor: '#4a4a4a',
        boxShadow: 'none',
        width: '160px',
        borderRadius: '3px',
        position: 'relative',
        top: '5px',
        fontSize: '12px',
        padding: '7px 9px',
    },
    recommendedIcon: {
        backgroundColor: colors.accentSecondaryLight,
        height: '8px',
        width: '8px',
        borderRadius: '4px',
        alignSelf: 'center',
    },
    recommendedWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '8px',
    },
};
