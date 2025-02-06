import React from 'react'
import AggregationType from '../../../components/VisualizationOptions/Options/AggregationType.jsx'
import CompletedOnly from '../../../components/VisualizationOptions/Options/CompletedOnly.jsx'
import getAdvancedTemplate from './templates/advanced.js'

export default () => ({
    ...getAdvancedTemplate({
        content: React.Children.toArray([
            <AggregationType />,
            <CompletedOnly />,
        ]),
    }),
})
