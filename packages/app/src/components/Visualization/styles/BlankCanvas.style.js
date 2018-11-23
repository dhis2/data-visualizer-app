import { colors } from '../../../modules/colors';

export default {
    outer: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
    },
    inner: {
        maxWidth: 500,
        textAlign: 'center',
        alignSelf: 'center',
    },
    title: {
        fontWeight: 'bold',
        marginTop: '10px',
        color: colors.greyDark,
    },
    description: {
        fontWeight: 'bold',
        marginTop: '10px',
        color: colors.grey,
    },
};
