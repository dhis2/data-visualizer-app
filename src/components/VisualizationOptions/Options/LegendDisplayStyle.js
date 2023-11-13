import {
    LEGEND_DISPLAY_STYLE_FILL,
    LEGEND_DISPLAY_STYLE_TEXT,
} from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTION_LEGEND_DISPLAY_STYLE } from '../../../modules/options.js'
import { default as RadioBaseOption } from './RadioBaseOption.js'

const LegendDisplayStyle = ({ disabled }) => (
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
        disabled={disabled}
        dataTest={'legend-display-style'}
    />
)

LegendDisplayStyle.propTypes = {
    disabled: PropTypes.bool,
}

export default LegendDisplayStyle
