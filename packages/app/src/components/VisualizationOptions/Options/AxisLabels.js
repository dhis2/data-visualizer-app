import { FONT_STYLE_AXIS_LABELS } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import { Label } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { tabSectionOption } from '../styles/VisualizationOptions.style.js'
import TextStyle from './TextStyle'

const AxisLabels = ({ disabled, axisId }) => (
    <div className={tabSectionOption.className}>
        <Label>{i18n.t('Labels')}</Label>
        <TextStyle
            fontStyleKey={FONT_STYLE_AXIS_LABELS}
            disabled={disabled}
            axisId={axisId}
            dataTest={`option-axis-label-${axisId}-text-style`}
        />
    </div>
)

AxisLabels.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
}

export default AxisLabels
