import { colors } from '@dhis2/ui'
import * as layoutStyle from '../../styles/style.js'

export default {
    axisContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: layoutStyle.AXIS_BACKGROUND_COLOR,
        borderColor: layoutStyle.AXIS_BORDER_COLOR,
        borderStyle: layoutStyle.AXIS_BORDER_STYLE,
        borderWidth: layoutStyle.AXIS_BORDER_WIDTH,
        padding: layoutStyle.AXIS_PADDING,
    },
    label: {
        minWidth: 55,
        maxWidth: 55,
        padding: '2px 0px 0px 0px',
        fontSize: 10,
        color: colors.grey600,
        userSelect: 'none',
        fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace`,
        textTransform: 'uppercase',
    },
}
// TODO: Refactor this file and all other affected files (DefaultLayout + everything in ../../styles/) to css modules
