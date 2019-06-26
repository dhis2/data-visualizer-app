import { colors } from '@dhis2/analytics';

const error = {
    fontWeight: 'bold',
    marginTop: '30px',
    lineHeight: '22px',
};

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
        ...error,
        color: colors.greyDark,
    },
    description: {
        ...error,
        color: colors.grey,
    },
};
