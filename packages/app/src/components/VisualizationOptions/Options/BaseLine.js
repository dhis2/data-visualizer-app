import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import {
    OPTION_BASE_LINE_ENABLED,
    OPTION_BASE_LINE_TITLE,
    OPTION_BASE_LINE_TITLE_FONT_STYLE,
    OPTION_BASE_LINE_VALUE,
} from '../../../modules/options.js'
import RegressionLine from './RegressionLine.js'

export const BaseLine = ({ disabled, axisId, isVertical }) => (
    <RegressionLine
        disabled={disabled}
        label={i18n.t('Base line')}
        dataTest="option-base-line"
        fontStyleKey={OPTION_BASE_LINE_TITLE_FONT_STYLE}
        titleId={OPTION_BASE_LINE_TITLE}
        valueId={OPTION_BASE_LINE_VALUE}
        enabledId={OPTION_BASE_LINE_ENABLED}
        axisId={axisId}
        isVertical={isVertical}
    />
)

BaseLine.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
    isVertical: PropTypes.bool,
}

export default BaseLine
