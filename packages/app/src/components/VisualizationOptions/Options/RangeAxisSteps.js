import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import PositiveNumberBaseType from './PositiveNumberBaseType'
import { OPTION_AXIS_STEPS } from '../../../modules/options'

export const RangeAxisSteps = ({ disabled }) => (
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
            axisId: 'RANGE_0', //FIXME: RANGE_0: default vertical axis. But this should be replaced by a prop once implemented by Scatter
        }}
    />
)

RangeAxisSteps.propTypes = {
    disabled: PropTypes.bool,
}

export default RangeAxisSteps
