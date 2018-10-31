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

    const dialogContent = {
        root: {
            paddingBottom: 0,
            paddingTop: 0,
            display: 'flex',
            overflow: 'hidden',
            overflowY: 'hidden',
        },
    };

    const theme = createMuiTheme({
        overrides: {
            MuiButton: raisedButton,
            MuiSelect: selectField,
            MuiDialogContent: dialogContent,
        },
        typography: {
            useNextVariants: true,
        },
    });

    return theme;
};
