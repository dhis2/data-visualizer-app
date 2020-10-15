/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import RangeAxisLabel from '../../../components/VisualizationOptions/Options/RangeAxisLabel'
import AxisRange from '../../../components/VisualizationOptions/Options/AxisRange'
import RangeAxisSteps from '../../../components/VisualizationOptions/Options/RangeAxisSteps'
import RangeAxisDecimals from '../../../components/VisualizationOptions/Options/RangeAxisDecimals'
import SeriesAxisLabels from '../../../components/VisualizationOptions/Options/SeriesAxisLabels'
import getVerticalAxisTemplate from './templates/verticalAxis'

export default hasDisabledSections => ({
    ...getVerticalAxisTemplate({
        helpText: hasDisabledSections
            ? i18n.t(
                  'Vertical axis options are not supported yet when using multiple axes'
              )
            : null,
        content: React.Children.toArray([
            <RangeAxisLabel disabled={hasDisabledSections} />,
            <AxisRange disabled={hasDisabledSections} />,
            <RangeAxisSteps disabled={hasDisabledSections} />,
            <RangeAxisDecimals disabled={hasDisabledSections} />,
            <SeriesAxisLabels disabled={hasDisabledSections} />,
        ]),
    }),
})
