import { colors } from '../../../../colors';

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
    list: {
        listStyle: 'none',
        overflow: 'scroll',
        height: 455,
        paddingLeft: 0,
        margin: 0,
        userSelect: 'none',
    },
    subTitleText: {
        position: 'relative',
        color: colors.black,
        fontFamily: 'Roboto',
        height: 20,
        fontSize: 15,
        fontWeight: 500,
        top: 12,
        left: 8,
    },
    listItem: {
        display: 'flex',
        margin: 5,
        minHeight: 24,
    },
    highlighted: {
        backgroundColor: '#92C9F7',
    },
    unHighlighted: {
        borderRadius: 4,
        backgroundColor: '#BBDEFB',
        display: 'flex',
        padding: 2,
    },
    iconContainer: {
        width: 20,
    },
    icon: {
        backgroundColor: '#1976D2', // color
        position: 'relative',
        left: '44%',
        top: '44%',
        height: 6,
        width: 6,
    },
    text: {
        fontFamily: 'Roboto',
        wordBreak: 'break-word',
        fontSize: 14,
        paddingLeft: 3,
        paddingTop: 3,
    },
};
