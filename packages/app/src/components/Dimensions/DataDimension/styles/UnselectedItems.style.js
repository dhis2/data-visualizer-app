import { colors } from '../../../../colors';

export const styles = {
    container: {
        border: '1px solid #E0E0E0',
        height: 376,
    },
    listContainer: {
        listStyle: 'none',
        overflowX: 'scroll',
        height: 340,
        width: 418,
        borderBottom: 0,
        paddingLeft: 0,
        margin: 0,
        userSelect: 'none',
    },
    listItem: {
        display: 'flex',
        margin: 5,
    },
    highlighted: {
        backgroundColor: '#92C9F7',
        borderRadius: 4,
    },
    unHighlighted: {
        display: 'flex',
        padding: 2,
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 14,
        paddingLeft: 2,
        paddingRight: 2,
    },
    icon: {
        backgroundColor: colors.grey,
        height: 6,
        width: 6,
        marginTop: 4,
        marginLeft: 10,
        marginRight: 5,
    },
};
