import { colors } from '@dhis2/ui'

export const styles = {
    tooltip: {
        fontFamily: 'roboto',
        padding: '7px 9px',
        color: colors.white,
        fontSize: '12px',
        backgroundColor: colors.grey900,
        boxShadow: 'none',
        borderRadius: '3px',
        position: 'relative',
        top: '5px',
        maxWidth: '300px',
    },
    list: {
        listStyleType: 'none',
        margin: '0px',
        marginBottom: '-3px',
        padding: '0px',
    },
    item: {
        marginBottom: '3px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    icon: {
        fontSize: '13px',
        marginRight: '6px',
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    },
    warningLabel: {
        whiteSpace: 'normal',
    },
}
