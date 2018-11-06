import { colors } from '../../../../../modules/colors';

export const styles = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        display: 'flex',
        height: 53,
        width: 420,
        borderBottom: 0,
        paddingTop: 5,
    },
    groupContainer: {
        display: 'flex',
        flexFlow: 'column',
        width: 'inherit',
        minWidth: 316,
        paddingLeft: 5,
        paddingRight: 5,
    },
    titleText: {
        color: colors.greyDark,
        fontSize: 13,
        fontWeight: 300,
        paddingBottom: 15,
    },
    dropDown: {
        padding: 0,
    },
};
