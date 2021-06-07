import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTION_AXIS_DECIMALS } from '../../../modules/options'
import PositiveNumberBaseType from './PositiveNumberBaseType'

const AxisDecimals = ({ disabled, axisId }) => (
    <PositiveNumberBaseType
        width="96px"
        label={i18n.t('Decimals')}
        disabled={disabled}
        placeholder={i18n.t('Auto')}
        option={{
            id: OPTION_AXIS_DECIMALS,
            axisId,
        }}
    />
)

AxisDecimals.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
}

export default AxisDecimals
