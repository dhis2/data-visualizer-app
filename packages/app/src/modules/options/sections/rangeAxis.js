/* eslint-disable react/jsx-key */
import {
    FONT_STYLE_HORIZONTAL_AXIS_TITLE,
    FONT_STYLE_VERTICAL_AXIS_TITLE,
} from '@dhis2/analytics'
import React from 'react'
import AxisDecimals from '../../../components/VisualizationOptions/Options/AxisDecimals.js'
import AxisLabels from '../../../components/VisualizationOptions/Options/AxisLabels.js'
import AxisRange from '../../../components/VisualizationOptions/Options/AxisRange.js'
import AxisSteps from '../../../components/VisualizationOptions/Options/AxisSteps.js'
import AxisTitle from '../../../components/VisualizationOptions/Options/AxisTitle.js'
import { BaseLine } from '../../../components/VisualizationOptions/Options/BaseLine.js'
import { TargetLine } from '../../../components/VisualizationOptions/Options/TargetLine.js'
import getHorizontalAxisTemplate from './templates/horizontalAxis.js'
import getVerticalAxisTemplate from './templates/verticalAxis.js'

export default ({ axisId, isVertical, showLines, hasCustomAxes }) => {
    const template = isVertical
        ? getHorizontalAxisTemplate
        : getVerticalAxisTemplate

    const fontStyleKey = isVertical
        ? FONT_STYLE_HORIZONTAL_AXIS_TITLE
        : FONT_STYLE_VERTICAL_AXIS_TITLE

    return {
        ...template({
            content: React.Children.toArray([
                <AxisTitle
                    axisId={axisId}
                    fontStyleKey={fontStyleKey}
                    hasCustomAxes={hasCustomAxes}
                    showAutoOption
                />,
                <AxisRange axisId={axisId} />,
                <AxisSteps axisId={axisId} />,
                <AxisDecimals axisId={axisId} />,
                <AxisLabels axisId={axisId} />,
                ...(showLines
                    ? [
                          <TargetLine
                              axisId={axisId}
                              isVertical={isVertical}
                          />,
                          <BaseLine axisId={axisId} isVertical={isVertical} />,
                      ]
                    : []),
            ]),
            ...(hasCustomAxes ? { axisId } : null),
        }),
    }
}
