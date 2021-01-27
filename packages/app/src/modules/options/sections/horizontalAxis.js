/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { FONT_STYLE_HORIZONTAL_AXIS_TITLE } from '@dhis2/analytics'

import AxisTitle from '../../../components/VisualizationOptions/Options/AxisTitle'
import AxisLabels from '../../../components/VisualizationOptions/Options/AxisLabels'

const axisId = 'DOMAIN_0'

export default () => ({
    key: 'axes-horizontal-axis',
    label: i18n.t('Horizontal (x) axis'),
    content: React.Children.toArray([
        <AxisTitle
            axisId={axisId}
            fontStyleKey={FONT_STYLE_HORIZONTAL_AXIS_TITLE}
        />,
        <AxisLabels axisId={axisId} />,
    ]),
})
