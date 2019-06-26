import { colors } from '@dhis2/analytics';

import defaultLayoutStyle from './DefaultLayout.style';
import * as layoutStyle from '../../styles/style';

export default {
    axisContainer: {
        display: 'flex',
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
        color: colors.greyDark,
        userSelect: 'none',
        letterSpacing: '0.2px',
    },
    content: {
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        minHeight: defaultLayoutStyle.DIMENSION_AXIS_CONTENT_HEIGHT,
    },
};
