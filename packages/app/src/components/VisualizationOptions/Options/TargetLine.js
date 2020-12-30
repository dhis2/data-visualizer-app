import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import {
    OPTION_TARGET_LINE_TITLE,
    OPTION_TARGET_LINE_TITLE_FONT_STYLE,
    OPTION_TARGET_LINE_VALUE,
} from '../../../modules/options'
import RegressionLine from './RegressionLine'

export const TargetLine = ({ disabled }) => (
    <RegressionLine
        disabled={disabled}
        label={i18n.t('Target line')}
        dataTest="option-target-line"
        fontStyleKey={OPTION_TARGET_LINE_TITLE_FONT_STYLE}
        titleId={OPTION_TARGET_LINE_TITLE}
        valueId={OPTION_TARGET_LINE_VALUE}
    />
)

TargetLine.propTypes = {
    disabled: PropTypes.bool,
}

export default TargetLine
