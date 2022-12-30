import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTION_AXIS_MIN_VALUE } from '../../../modules/options.js'
import NumberBaseType from './NumberBaseType.js'

const AxisMinValue = ({ disabled, axisId }) => (
    <NumberBaseType
        width="100px"
        placeholder={i18n.t('Min')}
        disabled={disabled}
        option={{
            id: OPTION_AXIS_MIN_VALUE,
            axisId,
        }}
        inline
        dataTest={`${axisId}-axis-range-min`}
    />
)

AxisMinValue.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
}

export default AxisMinValue
