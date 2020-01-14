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
        position: 'relative',
    },
    title: {
        ...error,
        color: colors.grey700,
        marginTop: 0,
    },
    description: {
        ...error,
        color: colors.grey500,
    },
    section: {
        textAlign: 'left',
        background: '#fff',
        padding: 20,
        marginBottom: 20,
    },
    guide: {
        fontSize: 14,
        lineHeight: '18px',
        letterSpacing: '0.1px',
        listStylePosition: 'outside',
        margin: '0 0 0 12px',
        padding: 0,
    },
    guideItem: {
        marginLeft: 10,
        paddingLeft: 10,
    },
    favorite: {
        cursor: 'pointer',
    },
}
