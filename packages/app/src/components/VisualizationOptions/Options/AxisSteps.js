import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import PositiveNumberBaseType from './PositiveNumberBaseType'
import { OPTION_AXIS_STEPS } from '../../../modules/options'

export const AxisSteps = ({ disabled, axisId }) => (
    <PositiveNumberBaseType
        width="96px"
        helpText={i18n.t(
            'Number of axis tick steps, including the min and max. A value of 2 or lower will be ignored.'
        )}
        label={i18n.t('Steps')}
        disabled={disabled}
        placeholder={i18n.t('Auto')}
        option={{
            id: OPTION_AXIS_STEPS,
            axisId,
        }}
    />
)

AxisSteps.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
}

export default AxisSteps
