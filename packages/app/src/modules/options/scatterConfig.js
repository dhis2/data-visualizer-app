/* eslint-disable react/jsx-key */
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import InfoText from '../../components/VisualizationOptions/InfoText'
import Outliers from '../../components/VisualizationOptions/Options/Outliers'
import SkipRounding from '../../components/VisualizationOptions/Options/SkipRounding'
import getAdvancedSection from './sections/advanced'
import getRangeAxisSection from './sections/rangeAxis'
import getDisplayTemplate from './sections/templates/display'
import getLinesTemplate from './sections/templates/lines'
import getTitlesSection from './sections/titles'
import getAxesTab from './tabs/axes'
import getDataTab from './tabs/data'
import getOutliersTab from './tabs/outliers'
import getSeriesTab from './tabs/series'
import getStyleTab from './tabs/style'

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
