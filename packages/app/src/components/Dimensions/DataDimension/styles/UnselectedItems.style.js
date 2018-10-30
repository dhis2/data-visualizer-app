import { colors } from '../../../../modules/colors';

export const styles = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        height: 376,
    },
    listContainer: {
        userSelect: 'none',
        listStyle: 'none',
        overflowY: 'auto',
        height: 340,
        width: 418,
        borderBottom: 0,
        paddingLeft: 0,
        margin: 0,
    },
    listItem: {
        display: 'flex',
        margin: 5,
    },
};
