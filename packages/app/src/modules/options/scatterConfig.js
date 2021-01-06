/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'
import {
    FONT_STYLE_HORIZONTAL_AXIS_TITLE,
    FONT_STYLE_VERTICAL_AXIS_TITLE,
} from '@dhis2/analytics'

import getSeriesTab from './tabs/series'
import getStyleTab from './tabs/style'
import getTitlesSection from './sections/titles'
import getColorSetSection from './sections/colorSet'
import getAxesTab from './tabs/axes'
import getOutliersTab from './tabs/outliers'
import AxisTitle from '../../components/VisualizationOptions/Options/AxisTitle'
import AxisRange from '../../components/VisualizationOptions/Options/AxisRange'
import AxisSteps from '../../components/VisualizationOptions/Options/AxisSteps'
import AxisDecimals from '../../components/VisualizationOptions/Options/AxisDecimals'
import AxisLabels from '../../components/VisualizationOptions/Options/AxisLabels'
import TargetLine from '../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../components/VisualizationOptions/Options/BaseLine'

const verticalAxisId = 'RANGE_0'
const horisontalAxisId = 'RANGE_1'

export default () => [
    getAxesTab([
        {
            key: 'axes-vertical-axis',
            label: i18n.t('Vertical axis'),
            content: React.Children.toArray([
                <AxisTitle
                    axisId={verticalAxisId}
                    fontStyleKey={FONT_STYLE_VERTICAL_AXIS_TITLE}
                />,
                <AxisRange axisId={verticalAxisId} />,
                <AxisSteps axisId={verticalAxisId} />,
                <AxisDecimals axisId={verticalAxisId} />,
                <AxisLabels axisId={verticalAxisId} />,
                <TargetLine axisId={verticalAxisId} />,
                <BaseLine axisId={verticalAxisId} />,
            ]),
        },
        {
            key: 'axes-horizontal-axis',
            label: i18n.t('Horizontal axis'),
            content: React.Children.toArray([
                <AxisTitle
                    axisId={horisontalAxisId}
                    fontStyleKey={FONT_STYLE_HORIZONTAL_AXIS_TITLE}
                />,
                <AxisRange axisId={horisontalAxisId} />,
                <AxisSteps axisId={horisontalAxisId} />,
                <AxisDecimals axisId={horisontalAxisId} />,
                <AxisLabels axisId={horisontalAxisId} />,
                <TargetLine axisId={horisontalAxisId} isVertical={true} />,
                <BaseLine axisId={horisontalAxisId} isVertical={true} />,
            ]),
        },
    ]),
    getSeriesTab(),
    getStyleTab([getTitlesSection(), getColorSetSection()]),
    getOutliersTab([
        {
            key: 'outlier-analysis',
            content: React.Children.toArray([]),
        },
    ]),
]
