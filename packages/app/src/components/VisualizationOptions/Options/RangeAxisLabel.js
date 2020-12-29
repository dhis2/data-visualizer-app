import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { FONT_STYLE_VERTICAL_AXIS_TITLE } from '@dhis2/analytics'

import TextBaseOption from './TextBaseOption'
import { OPTION_AXIS_TITLE } from '../../../modules/options'

const RangeAxisLabel = ({ disabled }) => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Axis title')}
        disabled={disabled}
        placeholder={i18n.t('Add a title')}
        option={{
            id: OPTION_AXIS_TITLE,
            axisId: 'RANGE_0',
        }}
        toggleable={true}
        fontStyleKey={FONT_STYLE_VERTICAL_AXIS_TITLE}
        dataTest={'option-vertical-axis-title'}
    />
)

RangeAxisLabel.propTypes = {
    disabled: PropTypes.bool,
}

export default RangeAxisLabel
