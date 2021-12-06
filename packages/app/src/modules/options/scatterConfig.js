/* eslint-disable react/jsx-key */
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import InfoText from '../../components/VisualizationOptions/InfoText.js'
import Outliers from '../../components/VisualizationOptions/Options/Outliers.js'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding.js'
import getAdvancedSection from './sections/advanced.js'
import getRangeAxisSection from './sections/rangeAxis.js'
import getDisplayTemplate from './sections/templates/display.js'
import getLinesTemplate from './sections/templates/lines.js'
import getTitlesSection from './sections/titles.js'
import getAxesTab from './tabs/axes.js'
import getDataTab from './tabs/data.js'
import getOutliersTab from './tabs/outliers.js'
import getSeriesTab from './tabs/series.js'
import getStyleTab from './tabs/style.js'

const verticalAxisId = 'RANGE_0'
const horisontalAxisId = 'RANGE_1'

export default () => [
    getDataTab([
        getDisplayTemplate({
            content: React.Children.toArray([<SkipRounding />]),
        }),
        getLinesTemplate({
            // TODO: Add trend line?
            content: React.Children.toArray([
                <InfoText
                    text={i18n.t(
                        'Base and target lines are available on the Axes tab for scatter charts'
                    )}
                />,
            ]),
        }),
        getAdvancedSection(),
    ]),
    getAxesTab([
        getRangeAxisSection({
            axisId: verticalAxisId,
            showLines: true,
        }),
        getRangeAxisSection({
            axisId: horisontalAxisId,
            showLines: true,
            isVertical: true,
        }),
    ]),
    getSeriesTab(),
    getStyleTab([getTitlesSection()]),
    getOutliersTab([
        {
            key: 'outlier-analysis',
            content: React.Children.toArray([<Outliers />]),
        },
    ]),
]
