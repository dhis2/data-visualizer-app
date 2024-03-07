import React from 'react'
import DigitGroupSeparator from '../../components/VisualizationOptions/Options/DigitGroupSeparator.js'
import DisplayDensity from '../../components/VisualizationOptions/Options/DisplayDensity.js'
import FontSize from '../../components/VisualizationOptions/Options/FontSize.js'
import Outliers from '../../components/VisualizationOptions/Options/OutliersForOutlierTable.js'
import OutliersMaxResults from '../../components/VisualizationOptions/Options/OutliersMaxResults.js'
import ShowHierarchy from '../../components/VisualizationOptions/Options/ShowHierarchy.js'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.js'
import getDisplayTemplate from './sections/templates/display.js'
import getDataTab from './tabs/data.js'
import getOutliersTab from './tabs/outliers.js'
import getStyleTab from './tabs/style.js'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([
                <SkipRounding />,
                <OutliersMaxResults />,
            ]),
        }),
    ]),
    getStyleTab([
        {
            key: 'style-section-1',
            content: React.Children.toArray([
                <DisplayDensity />,
                <FontSize />,
                <DigitGroupSeparator />,
                <ShowHierarchy />,
            ]),
        },
    ]),
    getOutliersTab([
        {
            key: 'outliers-section-1',
            content: React.Children.toArray([<Outliers />]),
        },
    ]),
]
