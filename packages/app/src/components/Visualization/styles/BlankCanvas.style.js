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
        position: 'relative',
        top: '-20%',
    },
    title: {
        fontWeight: 'bold',
        marginTop: '20px',
        color: colors.greyDark,
    },
    description: {
        fontWeight: 'bold',
        marginTop: '20px',
        color: colors.grey,
    },
};
