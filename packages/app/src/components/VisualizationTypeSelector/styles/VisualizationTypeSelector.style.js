import { colors } from '../../../modules/colors';

export default {
    button: {
        padding: '7px',
        color: colors.black,
        fontSize: '15px',
        textTransform: 'none',
        fontWeight: 'normal',
        backgroundColor: colors.white,
        justifyContent: 'flex-start',
    },
    dropDownArrow: {
        marginLeft: 'auto',
    },
    menu: {
        maxWidth: '600px',
        padding: 0,
    },
    menuDivider: {
        border: 'none',
        borderBottom: '1px solid',
        borderColor: colors.greyLight,
    },
    menuItem: {
        height: 120,
        width: 126,
        margin: '8px',
        padding: '0 4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '8px',
        float: 'left',
    },
    listItemIcon: {
        margin: 0,
        marginBottom: 15,
    },
    listItemSvg: {
        width: 48,
        height: 48,
    },
    listItemText: {
        fontSize: 14,
        flex: 'none',
        padding: 0,
        whiteSpace: 'normal',
        textAlign: 'center',
    },
};
