import {
    FONT_STYLE_HORIZONTAL_AXIS_TITLE,
    FONT_STYLE_VERTICAL_AXIS_TITLE,
} from '@dhis2/analytics'
import React from 'react'
import AxisDecimals from '../../../components/VisualizationOptions/Options/AxisDecimals.jsx'
import AxisLabels from '../../../components/VisualizationOptions/Options/AxisLabels.jsx'
import AxisRange from '../../../components/VisualizationOptions/Options/AxisRange.jsx'
import { default as AxisSteps } from '../../../components/VisualizationOptions/Options/AxisSteps.jsx'
import AxisTitle from '../../../components/VisualizationOptions/Options/AxisTitle.jsx'
import { BaseLine } from '../../../components/VisualizationOptions/Options/BaseLine.jsx'
import { TargetLine } from '../../../components/VisualizationOptions/Options/TargetLine.jsx'
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
