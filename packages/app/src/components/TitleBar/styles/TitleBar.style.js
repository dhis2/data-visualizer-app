import { colors } from '@dhis2/ui'

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
    titleUnsaved: {
        color: colors.grey500,
        fontStyle: 'italic',
    },
    titleDirty: {
        color: colors.grey700,
    },
}
