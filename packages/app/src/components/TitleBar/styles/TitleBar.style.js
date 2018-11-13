import { colors } from '../../../modules/colors';

export default {
    titleBar: {
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        background: '#fff',
        padding: '6px',
        borderRadius: '5px',
        fontSize: '14px',
        margin: '4px',
    },
    titleUnsaved: {
        color: colors.grey,
        fontStyle: 'italic',
    },
    titleDirty: {
        color: colors.greyDark,
    },
    interpretation: {
        background: '#fff',
        padding: '6px',
        borderRadius: '5px',
        fontSize: '12px',
        margin: '4px',
    },
};
