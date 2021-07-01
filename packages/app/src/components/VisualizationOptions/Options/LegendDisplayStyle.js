import {
    LEGEND_DISPLAY_STYLE_FILL,
    LEGEND_DISPLAY_STYLE_TEXT,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { OPTION_LEGEND_DISPLAY_STYLE } from '../../../modules/options'
import RadioBaseOption from './RadioBaseOption'

const LegendDisplayStyle = () => (
    <RadioBaseOption
        option={{
            id: OPTION_LEGEND_DISPLAY_STYLE,
            items: [
                {
                    id: LEGEND_DISPLAY_STYLE_FILL,
                    label: i18n.t('Legend changes background color'),
                },
                {
                    id: LEGEND_DISPLAY_STYLE_TEXT,
                    label: i18n.t('Legend changes text color'),
                },
            ],
        }}
        dataTest={'legend-display-style'}
    />
)

export default LegendDisplayStyle
