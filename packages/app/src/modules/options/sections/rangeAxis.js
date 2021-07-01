/* eslint-disable react/jsx-key */
import {
    FONT_STYLE_HORIZONTAL_AXIS_TITLE,
    FONT_STYLE_VERTICAL_AXIS_TITLE,
} from '@dhis2/analytics'
import React from 'react'
import AxisDecimals from '../../../components/VisualizationOptions/Options/AxisDecimals'
import AxisLabels from '../../../components/VisualizationOptions/Options/AxisLabels'
import AxisRange from '../../../components/VisualizationOptions/Options/AxisRange'
import AxisSteps from '../../../components/VisualizationOptions/Options/AxisSteps'
import AxisTitle from '../../../components/VisualizationOptions/Options/AxisTitle'
import BaseLine from '../../../components/VisualizationOptions/Options/BaseLine'
import TargetLine from '../../../components/VisualizationOptions/Options/TargetLine'
import getHorizontalAxisTemplate from './templates/horizontalAxis'
import getVerticalAxisTemplate from './templates/verticalAxis'

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
