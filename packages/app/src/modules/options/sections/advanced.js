/* eslint-disable react/jsx-key */
import React from 'react'
import AggregationType from '../../../components/VisualizationOptions/Options/AggregationType.js'
import CompletedOnly from '../../../components/VisualizationOptions/Options/CompletedOnly.js'
import getAdvancedTemplate from './templates/advanced.js'

export default () => ({
    ...getAdvancedTemplate({
        content: React.Children.toArray([
            <AggregationType />,
            <CompletedOnly />,
        ]),
    }),
})
