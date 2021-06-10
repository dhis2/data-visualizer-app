import i18n from '@dhis2/d2-i18n'
import React from 'react'
import RadioBaseOption from './RadioBaseOption'

export const LEGEND_DISPLAY_STYLE_OPTION_NAME = 'legendDisplayStyle'
export const LEGEND_DISPLAY_STYLE_FILL = 'FILL'
export const LEGEND_DISPLAY_STYLE_TEXT = 'TEXT'

const LegendDisplayStyle = () => (
    <RadioBaseOption
        option={{
            name: LEGEND_DISPLAY_STYLE_OPTION_NAME,
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
    />
)

export default LegendDisplayStyle
