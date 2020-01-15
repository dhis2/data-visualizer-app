import { colors, spacers } from '@dhis2/ui-core'

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
        padding: `${spacers.dp16} ${spacers.dp24}`,
        maxWidth: 600,
        boxSizing: 'border-box',
        color: colors.grey900,
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
        borderRadius: 5,
    },
    guide: {
        lineHeight: '18px',
        letterSpacing: '0.1px',
        listStylePosition: 'outside',
        margin: '0 0 0 12px',
        padding: '0 0 0 10px',
    },
    guideItem: {
        fontSize: '14px',
        lineHeight: '18px',
        letterSpacing: '0.1px',
        marginBottom: '12px',
    },
    visualization: {
        margin: '0 0 12px 0',
        padding: 0,
        letterSpacing: '0.1px',
        lineHeight: '16px',
        cursor: 'pointer',
        fontSize: '14px',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}
