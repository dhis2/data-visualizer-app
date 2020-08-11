import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'

export const RangeAxisSteps = ({ disabled }) => (
    <TextBaseOption
        type="number"
        width="96px"
        helpText={i18n.t(
            'The number of axis steps between the min and max values'
        )}
        label={i18n.t('Steps')}
        disabled={disabled}
        placeholder={i18n.t('Auto')}
        option={{
            name: 'rangeAxisSteps',
        }}
    />
)

RangeAxisSteps.propTypes = {
    disabled: PropTypes.bool,
}

export default RangeAxisSteps
