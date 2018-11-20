import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from './colors';

export const muiTheme = () => {
    const raisedButton = {
        root: {
            flatPrimary: colors.royalBlue,
        },
        disabled: {
            flatPrimary: colors.paleBlue,
            color: colors.lightMediumGrey,
        },
    };

    const selectField = {
        select: {
            '&:focus': {
                background: '$labelcolor',
            },
        },
    };

    const inputField = {
        underline: {
            '&:after': {
                borderBottom: `1px solid #aaa`,
            },
            '&:before': {
                borderBottom: `1px solid ${colors.greyLight}`,
            },
            '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottom: `1px solid ${colors.greyLight}`,
            },
        },
    };

    const dialogContent = {
        root: {
            paddingBottom: 0,
            paddingTop: 0,
            overflow: 'hidden',
            overflowY: 'hidden',
        },
    };

    const theme = createMuiTheme({
        overrides: {
            MuiButton: raisedButton,
            MuiSelect: selectField,
            MuiDialogContent: dialogContent,
            MuiInput: inputField,
        },
        typography: {
            useNextVariants: true,
        },
    });

    return theme;
};
