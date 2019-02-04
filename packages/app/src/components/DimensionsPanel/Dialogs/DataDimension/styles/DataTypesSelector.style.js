import { colors } from '../../../../../modules/colors';

export const styles = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        display: 'flex',
        flexFlow: 'column',
        height: 53,
        borderBottom: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
    },
    titleText: {
        color: colors.greyDark,
        fontSize: 13,
        fontWeight: 300,
        paddingBottom: 10,
    },
    dropDown: {
        outline: 'none',
        padding: 0,
    },
    dropDownItem: {
        fontSize: 16,
    },
};
