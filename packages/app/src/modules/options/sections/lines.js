/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import RegressionType from '../../../components/VisualizationOptions/Options/RegressionType'
import TargetLine from '../../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../../components/VisualizationOptions/Options/BaseLine'
import getLinesTemplate from './templates/lines'
import InfoText from '../../../components/VisualizationOptions/InfoText'

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
