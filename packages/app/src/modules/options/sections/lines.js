/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import RegressionType from '../../../components/VisualizationOptions/Options/RegressionType'
import TargetLine from '../../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../../components/VisualizationOptions/Options/BaseLine'
import getLinesTemplate from './templates/lines'

export default (hasDisabledSections, axisId) => ({
    ...getLinesTemplate({
        helpText: hasDisabledSections
            ? i18n.t('Lines are not supported yet when using multiple axes')
            : null,
        content: React.Children.toArray([
            <RegressionType disabled={hasDisabledSections} />,
            <TargetLine disabled={hasDisabledSections} axisId={axisId} />,
            <BaseLine disabled={hasDisabledSections} axisId={axisId} />,
        ]),
    }),
})
