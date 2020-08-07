import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'

const RangeAxisDecimals = ({ disabled }) => (
    <TextBaseOption
        type="number"
        width="96px"
        label={i18n.t('Decimals')}
        disabled={disabled}
        placeholder={i18n.t('Auto')}
        option={{
            name: 'rangeAxisDecimals',
        }}
    />
)

RangeAxisDecimals.propTypes = {
    disabled: PropTypes.bool,
}

export default RangeAxisDecimals
