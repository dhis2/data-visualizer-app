import i18n from '@dhis2/d2-i18n'
import React from 'react'
import ColourByControl from '../../../components/VisualizationOptions/Options/Colours/ColourByControl.jsx'

export default ({ showLegend, showFill } = {}) => ({
    key: 'legend-colours-tab',
    label: i18n.t('Legend & Colours'),
    content: [
        {
            key: 'legend-colours-section-1',
            content: React.Children.toArray([
                <ColourByControl showLegend={showLegend} showFill={showFill} />,
            ]),
        },
    ],
})
