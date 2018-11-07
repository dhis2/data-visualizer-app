import { colors } from '../../../modules/colors';

export const styles = {
    unselected: {
        display: 'flex',
        borderRadius: '4px',
    },
    selected: {
        backgroundColor: colors.lightBlue,
    },
    deleteButton: {
        border: 'none',
        background: 'none',
        marginLeft: '6px',
        marginRight: '4px',
        padding: '0px',
        width: '12px',
    },
    deleteButtonIcon: {
        fill: colors.blue,
        cursor: 'pointer',
        position: 'relative',
        top: '1px',
        height: '13px',
        width: '10px',
    },
};
