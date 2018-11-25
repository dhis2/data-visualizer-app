import { colors } from '../../../../modules/colors';

export const styles = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        height: '480px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        flexBasis: '278px',
        userSelect: 'none',
    },
    subTitleContainer: {
        borderBottom: `1px solid ${colors.greyLight}`,
        height: '40px',
        padding: '10px 0px 0px 10px',
    },
    subTitleText: {
        fontSize: '15px',
        fontWeight: '500',
    },
    list: {
        overflowY: 'auto',
        height: '100%',
    },
};
