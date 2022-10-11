/* eslint-disable react/jsx-key */
import {
    FONT_STYLE_HORIZONTAL_AXIS_TITLE,
    FONT_STYLE_VERTICAL_AXIS_TITLE,
} from '@dhis2/analytics'
import React from 'react'
import AxisLabels from '../../../components/VisualizationOptions/Options/AxisLabels.js'
import AxisTitle from '../../../components/VisualizationOptions/Options/AxisTitle.js'
import getHorizontalAxisTemplate from './templates/horizontalAxis.js'
import getVerticalAxisTemplate from './templates/verticalAxis.js'

export default ({ axisId, isVertical }) => {
    const template = isVertical
        ? getVerticalAxisTemplate
        : getHorizontalAxisTemplate

    const fontStyleKey = isVertical
        ? FONT_STYLE_VERTICAL_AXIS_TITLE
        : FONT_STYLE_HORIZONTAL_AXIS_TITLE

    return {
        ...template({
            content: React.Children.toArray([
                <AxisTitle axisId={axisId} fontStyleKey={fontStyleKey} />,
                <AxisLabels axisId={axisId} />,
            ]),
        }),
    }
}
