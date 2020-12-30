import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import {
    OPTION_BASE_LINE_TITLE,
    OPTION_BASE_LINE_TITLE_FONT_STYLE,
    OPTION_BASE_LINE_VALUE,
} from '../../../modules/options'
import RegressionLine from './RegressionLine'

export const BaseLine = ({ disabled }) => (
    <RegressionLine
        disabled={disabled}
        label={i18n.t('Base line')}
        dataTest="option-base-line"
        fontStyleKey={OPTION_BASE_LINE_TITLE_FONT_STYLE}
        titleId={OPTION_BASE_LINE_TITLE}
        valueId={OPTION_BASE_LINE_VALUE}
    />
)

BaseLine.propTypes = {
    disabled: PropTypes.bool,
}

export default BaseLine
