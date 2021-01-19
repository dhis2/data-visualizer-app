/* eslint-disable react/jsx-key */
import React from 'react'
import i18n from '@dhis2/d2-i18n'

import Legend from '../../../components/VisualizationOptions/Options/Legend'

export default ({ hideStyleOptions } = {}) => ({
    key: 'legend-tab',
    label: i18n.t('Legend'),
    content: [
        {
            key: 'legend-section-1',
            content: React.Children.toArray([
                <Legend hideStyleOptions={hideStyleOptions} />,
            ]),
        },
    ],
})
