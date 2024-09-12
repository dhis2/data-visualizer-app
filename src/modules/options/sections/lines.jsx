import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { InfoText } from '../../../components/VisualizationOptions/InfoText.jsx'
import { BaseLine } from '../../../components/VisualizationOptions/Options/BaseLine.jsx'
import RegressionType from '../../../components/VisualizationOptions/Options/RegressionType.jsx'
import { TargetLine } from '../../../components/VisualizationOptions/Options/TargetLine.jsx'
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
