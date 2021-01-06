import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'
import { OPTION_AXIS_TITLE } from '../../../modules/options'

const AxisTitle = ({ disabled, axisId, fontStyleKey }) => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Axis title')}
        disabled={disabled}
        placeholder={i18n.t('Add a title')}
        option={{
            id: OPTION_AXIS_TITLE,
            axisId,
        }}
        toggleable={true}
        fontStyleKey={fontStyleKey}
        dataTest={'option-axis-title'}
    />
)

AxisTitle.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
    fontStyleKey: PropTypes.string,
}

export default AxisTitle
