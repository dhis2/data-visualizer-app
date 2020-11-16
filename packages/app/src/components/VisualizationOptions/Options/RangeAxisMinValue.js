import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'

const RangeAxisMinValue = ({ disabled }) => (
    <TextBaseOption
        type="number"
        width="100px"
        placeholder={i18n.t('Min')}
        disabled={disabled}
        option={{
            name: 'rangeAxisMinValue',
        }}
        inline
        dataTest={'option-vertical-axis-range-min'}
    />
)

RangeAxisMinValue.propTypes = {
    disabled: PropTypes.bool,
}

export default RangeAxisMinValue
