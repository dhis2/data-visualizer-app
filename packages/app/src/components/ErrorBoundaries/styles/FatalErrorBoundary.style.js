import { colors } from '@dhis2/ui-core'

const bgColor = colors.grey050,
    iconColor = colors.grey500,
    primaryTextColor = colors.black,
    secondaryTextColor = colors.grey700

export default {
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        overflow: 'auto',
        overflowY: 'auto',

        color: primaryTextColor,
        backgroundColor: bgColor,

        display: 'flex',

        minWidth: 640,
        minHeight: 480,

        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        textAlign: 'center',
        color: 'black',
    },
    icon: {
        width: 96,
        height: 96,
        color: iconColor,
        marginBottom: 24,
    },
    message: {
        fontSize: '24px',
        marginBottom: 24,
    },
    link: {
        fontSize: '18px',
        textDecoration: 'underline',
        cursor: 'pointer',
        marginBottom: 24,
    },
    drawerToggle: {
        fontSize: '12px',
        color: secondaryTextColor,
        textDecoration: 'underline',
        cursor: 'pointer',
        marginBottom: 12,
    },
    drawerVisible: {
        padding: 8,
        display: 'block',
        height: 150,
        width: 500,
        overflow: 'auto',
        overflowY: 'auto',
        border: `1px solid ${secondaryTextColor}`,
        textAlign: 'left',
    },
    drawerHidden: {
        display: 'none',
    },
    errorIntro: {
        fontSize: '12px',
        lineHeight: 1.2,
        color: secondaryTextColor,
        marginBottom: 8,
        fontFamily: 'Menlo, Courier, monospace !important',
    },
    errorDetails: {
        fontSize: '12px',
        lineHeight: 1.2,
        color: 'red',
        fontFamily: 'Menlo, Courier, monospace !important',
    },
}
