/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import RangeAxisLabel from '../../../components/VisualizationOptions/Options/RangeAxisLabel'
import AxisRange from '../../../components/VisualizationOptions/Options/AxisRange'
import RangeAxisSteps from '../../../components/VisualizationOptions/Options/RangeAxisSteps'
import RangeAxisDecimals from '../../../components/VisualizationOptions/Options/RangeAxisDecimals'

export default hasCustomAxes => ({
    key: 'axes-vertical-axis',
    label: i18n.t('Vertical (y) axis'),
    helpText: hasCustomAxes
        ? i18n.t(
              'Vertical axis options are not supported yet when using multiple axes'
          )
        : null,
    content: React.Children.toArray([
        <RangeAxisLabel disabled={hasCustomAxes} />,
        <AxisRange disabled={hasCustomAxes} />,
        <RangeAxisSteps disabled={hasCustomAxes} />,
        <RangeAxisDecimals disabled={hasCustomAxes} />,
    ]),
})
