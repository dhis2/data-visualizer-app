import { colors } from '../../../modules/colors';

export const styles = {
    arrowButton: {
        padding: '0px',
        minWidth: '40px',
        width: '40px',
        minHeight: '36px',
        height: '36px',
        backgroundColor: colors.white,
    },
    arrowIcon: {
        height: '20px',
        width: '24px',
        fill: colors.greyDark,
    },
    buttonText: {
        fontSize: '13px',
        letterSpacing: '0.46',
    },
    deleteButton: {
        border: 'none',
        outline: 'none',
        background: 'none',
        padding: '0px',
        height: '18px',
        width: '18px',
    },
    close: {
        fill: colors.accentSecondary,
        height: '13px',
        width: '10px',
    },
    highlightedClose: {
        fill: colors.white,
        height: '13px',
        width: '10px',
    },
};
