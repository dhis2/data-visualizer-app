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
        display: 'flex',
        height: '40px',
    },
    subTitleText: {
        fontSize: '15px',
        fontWeight: '500',
        padding: '10px 0px 0px 10px',
    },
    list: {
        overflowY: 'auto',
        height: '100%',
    },
};
