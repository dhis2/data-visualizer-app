/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import RegressionType from '../../../components/VisualizationOptions/Options/RegressionType'
import TargetLine from '../../../components/VisualizationOptions/Options/TargetLine'
import BaseLine from '../../../components/VisualizationOptions/Options/BaseLine'

export default hasCustomAxes => ({
    key: 'data-lines',
    label: i18n.t('Lines'),
    helpText: hasCustomAxes
        ? i18n.t('Lines are not supported yet when using multiple axes')
        : null,
    content: React.Children.toArray([
        <RegressionType disabled={hasCustomAxes} />,
        <TargetLine disabled={hasCustomAxes} />,
        <BaseLine disabled={hasCustomAxes} />,
    ]),
})
