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

export default (axisId, showLines, hasCustomAxes) => ({
    ...getVerticalAxisTemplate({
        content: React.Children.toArray([
            <AxisTitle
                axisId={axisId}
                fontStyleKey={FONT_STYLE_VERTICAL_AXIS_TITLE}
                hasCustomAxes={hasCustomAxes}
            />,
            <AxisRange axisId={axisId} />,
            <AxisSteps axisId={axisId} />,
            <AxisDecimals axisId={axisId} />,
            <AxisLabels axisId={axisId} />,
            ...(showLines
                ? [<TargetLine axisId={axisId} />, <BaseLine axisId={axisId} />]
                : []),
        ]),
        ...(hasCustomAxes ? { axisId } : null),
    }),
})
