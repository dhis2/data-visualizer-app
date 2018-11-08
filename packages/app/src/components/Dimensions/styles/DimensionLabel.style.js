import { colors } from '../../../modules/colors';

export const styles = {
    unselected: {
        display: 'flex',
        borderRadius: '2px',
    },
    selected: {
        backgroundColor: colors.accentSecondaryTransparent,
        display: 'flex',
        borderRadius: '2px',
        width: '100%',
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
