import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import {
    OPTION_TARGET_LINE_ENABLED,
    OPTION_TARGET_LINE_TITLE,
    OPTION_TARGET_LINE_TITLE_FONT_STYLE,
    OPTION_TARGET_LINE_VALUE,
} from '../../../modules/options.js'
import { default as RegressionLine } from './RegressionLine.js'

export const TargetLine = ({ disabled, axisId, isVertical }) => (
    <RegressionLine
        disabled={disabled}
        label={i18n.t('Target line')}
        dataTest="option-target-line"
        fontStyleKey={OPTION_TARGET_LINE_TITLE_FONT_STYLE}
        titleId={OPTION_TARGET_LINE_TITLE}
        valueId={OPTION_TARGET_LINE_VALUE}
        enabledId={OPTION_TARGET_LINE_ENABLED}
        axisId={axisId}
        isVertical={isVertical}
    />
)

TargetLine.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
    isVertical: PropTypes.bool,
}
