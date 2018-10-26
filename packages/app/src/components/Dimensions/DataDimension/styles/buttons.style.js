import { colors } from '../../../../colors';

export const styles = {
    actionButton: {
        height: 36,
        width: 36,
        position: 'absolute',
        borderRadius: 2,
        backgroundColor: colors.white,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 8px 8px 0 rgba(0, 0, 0, 0.24)',
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
        background: 'none',
        padding: 0,
        paddingTop: 4,
        paddingLeft: 1,
        width: 10,
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
