import { colors } from '../../../../modules/colors';

export const styles = {
    arrowButton: {
        padding: '0px',
        minWidth: '40px',
        minHeight: '36px',
        boxShadow: '0 2px 5px #b1b1b1',
        borderRadius: '4px',
    },
    arrowIcon: {
        height: '20px',
        width: '24px',
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
