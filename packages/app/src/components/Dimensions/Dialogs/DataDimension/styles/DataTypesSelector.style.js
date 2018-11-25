import { colors } from '../../../../../modules/colors';

export const styles = {
    container: {
        border: `1px solid ${colors.greyLight}`,
        display: 'flex',
        flexDirection: 'column',
        height: 53,
        borderBottom: 0,
        padding: '5px 5px 0px 5px',
    },
    titleText: {
        fontSize: '13px',
        fontWeight: '300',
        paddingBottom: '10px',
    },
    dropDown: {
        outline: 'none',
        padding: '0',
    },
    dropDownItem: {
        fontSize: '16px',
    },
};
