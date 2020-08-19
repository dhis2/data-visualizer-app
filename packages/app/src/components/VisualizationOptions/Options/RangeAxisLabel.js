import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'

import TextBaseOption from './TextBaseOption'
import { options } from '../../../modules/options'
import { FONT_STYLE_VERTICAL_AXIS_TITLE } from '@dhis2/analytics'

const optionName = 'rangeAxisLabel'
const defaultValue = options[optionName].defaultValue

const RangeAxisLabel = ({ disabled }) => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Axis title')}
        disabled={disabled}
        placeholder={i18n.t('Add a title')}
        option={{
            name: optionName,
            defaultValue: defaultValue,
        }}
        toggleable={true}
        fontStyleKey={FONT_STYLE_VERTICAL_AXIS_TITLE}
    />
)

RangeAxisLabel.propTypes = {
    disabled: PropTypes.bool,
}

export default RangeAxisLabel
