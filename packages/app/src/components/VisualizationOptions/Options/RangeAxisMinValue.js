import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'
import { OPTION_AXIS_MIN_VALUE } from '../../../modules/options'

const RangeAxisMinValue = ({ disabled }) => (
    <TextBaseOption
        type="number"
        width="100px"
        placeholder={i18n.t('Min')}
        disabled={disabled}
        option={{
            id: OPTION_AXIS_MIN_VALUE,
            axisId: 'RANGE_0',
        }}
        inline
        dataTest={'option-vertical-axis-range-min'}
    />
)

RangeAxisMinValue.propTypes = {
    disabled: PropTypes.bool,
}

export default RangeAxisMinValue
