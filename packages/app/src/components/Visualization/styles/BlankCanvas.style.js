import { colors } from '../../../modules/colors';

export default {
    outer: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    inner: {
        maxWidth: 500,
        textAlign: 'center',
        alignSelf: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: colors.greyDark,
    },
};
