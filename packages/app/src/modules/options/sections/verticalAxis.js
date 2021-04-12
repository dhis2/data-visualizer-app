/* eslint-disable react/jsx-key */
import React from 'react'
import { FONT_STYLE_VERTICAL_AXIS_TITLE } from '@dhis2/analytics'

import AxisTitle from '../../../components/VisualizationOptions/Options/AxisTitle'
import AxisRange from '../../../components/VisualizationOptions/Options/AxisRange'
import AxisSteps from '../../../components/VisualizationOptions/Options/AxisSteps'
import AxisDecimals from '../../../components/VisualizationOptions/Options/AxisDecimals'
import AxisLabels from '../../../components/VisualizationOptions/Options/AxisLabels'
import getVerticalAxisTemplate from './templates/verticalAxis'
import BaseLine from '../../../components/VisualizationOptions/Options/BaseLine'
import TargetLine from '../../../components/VisualizationOptions/Options/TargetLine'
import RegressionType from '../../../components/VisualizationOptions/Options/RegressionType'

export default (axisId, showLines) => ({
    ...getVerticalAxisTemplate({
        content: React.Children.toArray([
            <AxisTitle
                axisId={axisId}
                fontStyleKey={FONT_STYLE_VERTICAL_AXIS_TITLE}
            />,
            <AxisRange axisId={axisId} />,
            <AxisSteps axisId={axisId} />,
            <AxisDecimals axisId={axisId} />,
            <AxisLabels axisId={axisId} />,
            ...(showLines
                ? [
                      <RegressionType />,
                      <TargetLine axisId={axisId} />,
                      <BaseLine axisId={axisId} />,
                  ]
                : []),
        ]),
        axisId,
    }),
})
