/* eslint-disable react/jsx-key */
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { InfoText } from '../../../components/VisualizationOptions/InfoText.js'
import { BaseLine } from '../../../components/VisualizationOptions/Options/BaseLine.js'
import RegressionType from '../../../components/VisualizationOptions/Options/RegressionType.js'
import { TargetLine } from '../../../components/VisualizationOptions/Options/TargetLine.js'
import getLinesTemplate from './templates/lines.js'

export default (hasDisabledSections, axisId) => ({
    ...getLinesTemplate({
        content: React.Children.toArray([
            [<RegressionType />],
            ...(!hasDisabledSections
                ? [<TargetLine axisId={axisId} />, <BaseLine axisId={axisId} />]
                : [
                      <InfoText
                          text={i18n.t(
                              'Base and target lines are available on the Axes tab for multi-axis charts'
                          )}
                      />,
                  ]),
        ]),
    }),
})
