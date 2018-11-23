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
    },
};

export default createMuiTheme(theme);
