import { colors } from '../../../../modules/colors';

export const styles = {
    actionButton: {
        outline: 'none',
        position: 'absolute',
        minWidth: 47,
        padding: 0,
        borderRadius: 4,
        backgroundColor: colors.white,
        boxShadow: '0 2px 5px #b1b1b1',
    },
    assignButton: {
        padding: 0,
        minWidth: 40,
        backgroundColor: colors.white,
    },
    arrowIcon: {
        height: 20,
        width: 24,
        position: 'relative',
        top: 2,
        right: 2,
    },
    deselectButton: { left: 76 },
    selectButton: { left: 165 },
    buttonText: { fontSize: 13, letterSpacing: 0.46 },
    deleteButton: {
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        background: 'none',
        padding: '3px 0px 0px 5px',
        width: 15,
    },
    deleteButtonIcon: { fill: colors.blue, height: 13, width: 10 },
};
