import { createMuiTheme } from '@material-ui/core/styles'
import dhis2theme from '@dhis2/d2-ui-core/theme/mui3.theme'

export const theme = {
    ...dhis2theme,
}

export default createMuiTheme(theme)
