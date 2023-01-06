/* eslint-disable react/jsx-key */
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import Legend from '../../../components/VisualizationOptions/Options/Legend.js'

export default ({ hideStyleOptions, hideByDataItemStrategy } = {}) => ({
    key: 'legend-tab',
    label: i18n.t('Legend'),
    content: [
        {
            key: 'legend-section-1',
            content: React.Children.toArray([
                <Legend
                    hideStyleOptions={hideStyleOptions}
                    hideByDataItemStrategy={hideByDataItemStrategy}
                />,
            ]),
        },
    ],
})
