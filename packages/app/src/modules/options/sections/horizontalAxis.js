/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import DomainAxisLabel from '../../../components/VisualizationOptions/Options/DomainAxisLabel'
import CategoryAxisLabels from '../../../components/VisualizationOptions/Options/CategoryAxisLabels'

export default () => ({
    key: 'axes-horizontal-axis',
    label: i18n.t('Horizontal (x) axis'),
    content: React.Children.toArray([
        <DomainAxisLabel />,
        <CategoryAxisLabels />,
    ]),
})
