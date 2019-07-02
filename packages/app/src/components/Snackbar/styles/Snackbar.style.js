import { colors } from '@dhis2/ui-core';

export default theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    closeIcon: {
        marginLeft: 8,
        width: 18,
        height: 18,
        cursor: 'pointer',
    },
    warning: {
        backgroundColor: colors.yellow500,
        color: colors.black,
    },
    error: {
        backgroundColor: colors.red500,
        color: colors.white,
    },
});
