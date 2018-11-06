import { colors } from '../../../modules/colors';

export const styles = {
    unselected: {
        display: 'flex',
        borderRadius: 4,
    },
    selected: {
        backgroundColor: colors.lightBlue,
    },
    deleteButton: {
        border: 'none',
        background: 'none',
        marginLeft: 6,
        marginRight: 4,
        padding: 0,
        width: 12,
    },
    deleteButtonIcon: {
        fill: colors.blue,
        height: 13,
        width: 10,
        cursor: 'pointer',
        position: 'relative',
        top: 1,
    },
};
