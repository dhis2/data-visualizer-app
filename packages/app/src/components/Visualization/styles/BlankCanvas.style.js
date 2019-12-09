import { colors } from '@dhis2/ui-core'

const error = {
    fontWeight: 'bold',
    marginTop: '30px',
    lineHeight: '22px',
}

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
        color: colors.grey700,
    },
    description: {
        ...error,
        color: colors.grey500,
    },
}
