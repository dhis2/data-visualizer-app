import { colors } from 'analytics-shared';

export default theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    closeIcon: {
        marginLeft: 8,
        width: 18,
        height: 18,
        cursor: 'pointer',
    },
    warning: {
        backgroundColor: '#FFCA28',
        color: colors.black,
    },
    error: {
        backgroundColor: '#D32F2F',
        color: colors.white,
    },
});
