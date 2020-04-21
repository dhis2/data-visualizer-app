import { colors } from '@dhis2/ui-core'

export default theme => ({
    menuBar: {
        background: colors.white,
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${theme.spacing.unit}px`,
        height: '38px',
    },
    updateButton: {
        marginRight: theme.spacing.unit,
    },
    grow: {
        flex: '1 1 0%',
    },
})
