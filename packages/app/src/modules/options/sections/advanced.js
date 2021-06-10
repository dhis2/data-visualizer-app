/* eslint-disable react/jsx-key */
import React from 'react'
import AggregationType from '../../../components/VisualizationOptions/Options/AggregationType'
import CompletedOnly from '../../../components/VisualizationOptions/Options/CompletedOnly'
import getAdvancedTemplate from './templates/advanced'

export default () => ({
    ...getAdvancedTemplate({
        content: React.Children.toArray([
            <AggregationType />,
            <CompletedOnly />,
        ]),
    }),
})
