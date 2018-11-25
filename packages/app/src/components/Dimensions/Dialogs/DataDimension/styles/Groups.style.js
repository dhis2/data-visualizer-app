import { colors } from '../../../../../modules/colors';

export const styles = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        display: 'flex',
        height: '53px',
        width: '100%',
        borderBottom: '0px',
        padding: '5px 5px 0px 5px',
    },
    groupContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: 'inherit',
    },
    titleText: {
        fontSize: '13px',
        fontWeight: '300',
        paddingBottom: '8px',
    },
    dropDown: {
        padding: '0px',
    },

    placeholder: {
        padding: '0px',
        fontWeight: '300',
    },
};
