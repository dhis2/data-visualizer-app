import { colors } from '../../../../../modules/colors';

export const styles = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        display: 'flex',
        height: '53px',
        width: '420px',
        borderBottom: '0px',
        paddingTop: '5px',
    },
    groupContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: 'inherit',
        minWidth: '316px',
        paddingLeft: '5px',
        paddingRight: '5px',
    },
    titleText: {
        color: colors.greyDark,
        fontSize: '13px',
        fontWeight: '300',
        paddingBottom: '10px',
    },
    dropDown: {
        padding: '0px',
    },

    placeholder: {
        padding: '0px',
        fontWeight: '300',
    },
};
