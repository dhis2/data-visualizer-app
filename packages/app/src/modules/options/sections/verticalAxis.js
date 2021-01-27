/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FONT_STYLE_VERTICAL_AXIS_TITLE } from '@dhis2/analytics'

import AxisTitle from '../../../components/VisualizationOptions/Options/AxisTitle'
import AxisRange from '../../../components/VisualizationOptions/Options/AxisRange'
import AxisSteps from '../../../components/VisualizationOptions/Options/AxisSteps'
import AxisDecimals from '../../../components/VisualizationOptions/Options/AxisDecimals'
import AxisLabels from '../../../components/VisualizationOptions/Options/AxisLabels'
import getVerticalAxisTemplate from './templates/verticalAxis'

const axisId = 'RANGE_0'

export default hasDisabledSections => ({
    ...getVerticalAxisTemplate({
        helpText: hasDisabledSections
            ? i18n.t(
                  'Vertical axis options are not supported yet when using multiple axes'
              )
            : null,
        content: React.Children.toArray([
            <AxisTitle
                disabled={hasDisabledSections}
                axisId={axisId}
                fontStyleKey={FONT_STYLE_VERTICAL_AXIS_TITLE}
            />,
            <AxisRange disabled={hasDisabledSections} axisId={axisId} />,
            <AxisSteps disabled={hasDisabledSections} axisId={axisId} />,
            <AxisDecimals disabled={hasDisabledSections} axisId={axisId} />,
            <AxisLabels disabled={hasDisabledSections} axisId={axisId} />,
        ]),
    }),
})
