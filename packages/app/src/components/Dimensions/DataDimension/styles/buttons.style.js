import { colors } from '../../../../modules/colors';

export const styles = {
    actionButton: {
        outline: 'none',
        height: 36,
        width: 36,
        position: 'absolute',
        borderRadius: 2,
        backgroundColor: colors.white,
        boxShadow: '0 2px 5px #b1b1b1',
    },
    arrowIcon: {
        height: 20,
        width: 24,
        position: 'relative',
        top: 2,
        right: 2,
    },
    deselectButton: {
        left: 76,
    },
    selectButton: {
        left: 165,
    },
    buttonText: {
        fontSize: 13,
        letterSpacing: 0.46,
    },
    updateButton: {
        marginLeft: 10,
        backgroundColor: colors.blue,
    },
    updateText: {
        color: colors.white,
        fontSize: 13,
        letterSpacing: 0.46,
    },
    hideText: {
        color: colors.blue,
        fontSize: 13,
        letterSpacing: 0.46,
    },
    deleteButton: {
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        background: 'none',
        padding: '3px 0px 0px 5px',
        width: 15,
    },
    deleteButtonIcon: {
        fill: colors.blue,
        height: 13,
        width: 10,
    },
    assignWrapper: {
        position: 'relative',
        bottom: '75%',
        left: '101.5%',
    },
    unAssignWrapper: {
        position: 'relative',
        right: '15%',
        bottom: '40%',
    },
};
