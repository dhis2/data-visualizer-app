import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'

const RangeAxisMaxValue = ({ disabled }) => (
    <TextBaseOption
        type="number"
        width="100px"
        placeholder={i18n.t('Max')}
        disabled={disabled}
        option={{
            name: 'rangeAxisMaxValue',
        }}
        inline
        dataTest={'option-vertical-axis-range-max'}
    />
)

RangeAxisMaxValue.propTypes = {
    disabled: PropTypes.bool,
}

export default RangeAxisMaxValue
