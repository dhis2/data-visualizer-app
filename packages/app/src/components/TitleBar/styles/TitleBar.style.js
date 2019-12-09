import { colors } from '@dhis2/ui-core'

export default {
    titleBar: {
        display: 'flex',
        justifyContent: 'center',
    },
    cell: {
        display: 'flex',
        alignItems: 'center',
        background: colors.white,
        padding: '6px',
        borderRadius: '5px',
        margin: '4px',
    },
    title: {
        fontSize: '14px',
    },
    suffix: {
        paddingLeft: '4px',
    },
    interpretation: {
        fontSize: '12px',
        color: colors.grey700,
    },
    interpretationIcon: {
        display: 'flex',
        alignItems: 'center',
        height: '14px',
        width: '14px',
        marginRight: '3px',
    },
    titleUnsaved: {
        color: colors.grey500,
        fontStyle: 'italic',
    },
    titleDirty: {
        color: colors.grey700,
    },
}
