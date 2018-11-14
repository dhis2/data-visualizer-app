import { colors } from '../../../modules/colors';

export default {
    titleBar: {
        display: 'flex',
        justifyContent: 'center',
    },
    cell: {
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
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
    },
    titleUnsaved: {
        color: colors.grey,
        fontStyle: 'italic',
    },
    titleDirty: {
        color: colors.greyDark,
    },
};
