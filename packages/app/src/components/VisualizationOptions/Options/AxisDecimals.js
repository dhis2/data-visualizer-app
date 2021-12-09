import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { OPTION_AXIS_DECIMALS } from '../../../modules/options.js'
import { PositiveNumberBaseType } from './PositiveNumberBaseType.js'

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
        dataTest={`${axisId}-axis-decimals`}
    />
)

AxisDecimals.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
}

export default AxisDecimals
