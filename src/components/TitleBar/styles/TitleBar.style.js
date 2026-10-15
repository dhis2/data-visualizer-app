import { colors } from '@dhis2/ui'

export default {
    titleBar: {
        display: 'flex',
        alignItems: 'center',
        paddingInlineStart: '12px',
        marginInlineStart: '8px',
        borderInlineStart: '1px solid var(--colors-grey400)',
    },
    cell: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: '13px',
        fontWeight: '500',
        lineHeight: '16px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '360px',
    },
    suffix: {
        paddingInlineStart: '4px',
    },
    titleUnsaved: {
        color: colors.grey500,
        fontStyle: 'italic',
    },
    titleDirty: {
        color: colors.grey700,
    },
}
