import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import NumberBaseType from './NumberBaseType'
import { OPTION_AXIS_MAX_VALUE } from '../../../modules/options'

const AxisMaxValue = ({ disabled, axisId }) => (
    <NumberBaseType
        width="100px"
        placeholder={i18n.t('Max')}
        disabled={disabled}
        option={{
            id: OPTION_AXIS_MAX_VALUE,
            axisId,
        }}
        inline
        dataTest={'option-axis-range-max'}
    />
)

AxisMaxValue.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
}

export default AxisMaxValue
