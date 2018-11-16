import { colors } from '../../../../modules/colors';

export const styles = {
    assignButton: {
        padding: '0px',
        minWidth: '40px',
        minHeight: '36px',
        backgroundColor: colors.white,
    },
    arrowIcon: {
        height: '20px',
        width: '24px',
        position: 'relative',
        top: '2px',
        right: '2px',
        fill: colors.greyDark,
    },
    deselectButton: {
        left: '76px',
    },
    selectButton: {
        left: '165px',
    },
    buttonText: {
        fontSize: '13px',
        letterSpacing: '0.46',
    },
    deleteButton: {
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        background: 'none',
        padding: '0px',
        height: '18px',
        width: '18px',
    },
    deleteButtonIcon: {
        fill: colors.accentSecondary,
        height: '13px',
        width: '10px',
    },
};
