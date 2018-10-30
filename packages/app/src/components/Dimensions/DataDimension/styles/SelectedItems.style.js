import { colors } from '../../../../modules/colors';

export const styles = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        height: 534,
        minWidth: 278,
    },
    subTitleContainer: {
        borderBottom: `1px solid ${colors.greyLight}`,
        height: 42,
    },
    subTitleText: {
        position: 'relative',
        fontFamily: 'Roboto',
        color: colors.black,
        fontSize: 15,
        fontWeight: 500,
        height: 20,
        top: 12,
        left: 8,
    },
    list: {
        userSelect: 'none',
        listStyle: 'none',
        overflowY: 'auto',
        height: 455,
        paddingLeft: 0,
        margin: 0,
    },
    listItem: {
        display: 'flex',
        margin: 5,
        minHeight: 24,
    },
};
