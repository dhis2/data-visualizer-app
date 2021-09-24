import { colors } from '@dhis2/ui'

import * as layoutStyle from '../../styles/style'

export default {
    axisContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: layoutStyle.AXIS_BACKGROUND_COLOR,
        borderColor: layoutStyle.AXIS_BORDER_COLOR,
        borderStyle: layoutStyle.AXIS_BORDER_STYLE,
        borderWidth: layoutStyle.AXIS_BORDER_WIDTH,
        padding: layoutStyle.AXIS_PADDING,
    },
    axisContainerLeft: {
        borderLeftWidth: 0,
    },
    label: {
        minWidth: 55,
        maxWidth: 55,
        padding: '2px 0px 0px 0px',
        fontSize: 11,
        color: colors.grey700,
        userSelect: 'none',
        letterSpacing: '0.2px',
        display: 'flex',
        flexDirection: 'column',
    },
}
// TODO: Refactor this file and all other affected files (DefaultLayout + everything in ../../styles/) to css modules
