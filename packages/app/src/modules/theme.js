import { createMuiTheme } from '@material-ui/core/styles';
import dhis2theme from '@dhis2/d2-ui-core/theme/mui3.theme';
import { colors } from './colors';

export const theme = {
    ...dhis2theme,
    overrides: {
        // TODO: Move this customization to d2-ui so that it is standardized across apps
        ...dhis2theme.overrides,
        MuiMenuItem: {
            root: {
                paddingTop: dhis2theme.spacing.unit,
                paddingBottom: dhis2theme.spacing.unit,
                fontSize: '15px',
                '&$selected': {
                    backgroundColor: colors.accentSecondaryTransparent,
                },
                '&:hover': {
                    backgroundColor: colors.lightGrey,
                },
            },
        },
        MuiListItem: {
            button: {
                transition: null,
            },
        },
        MuiDialog: {
            paperWidthSm: {
                minWidth: 600,
                maxWidth: 800,
                minHeight: 700,
                maxHeight: 700,
            },
            paperWidthMd: {
                minWidth: 815,
                maxWidth: 960,
                minHeight: 750,
                maxHeight: 800,
            },
            paperWidthLg: {},
            paperFullWidth: {},
        },
        MuiDialogContent: {
            root: {
                ...dhis2theme.overrides.MuiDialogContent.root,
                overflow: 'hidden',
                overflowY: 'hidden',
            },
        },
        MuiInput: {
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
        },
    },
};

export default createMuiTheme(theme);
