import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { Label, Help } from '@dhis2/ui'

import AxisMinValue from './AxisMinValue'
import AxisMaxValue from './AxisMaxValue'

import {
    tabSectionOption,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js'

const AxisRange = ({ disabled, axisId }) => (
    <div className={tabSectionOption.className}>
        <Label>{i18n.t('Axis range')}</Label>
        <div className={tabSectionOptionComplexInline.className}>
            <AxisMinValue disabled={disabled} axisId={axisId} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {'\u00A0\u2013\u00A0'}
            </div>
            <AxisMaxValue disabled={disabled} axisId={axisId} />
        </div>
        {!disabled ? (
            <Help>
                {i18n.t('Values outside of the range will not be displayed')}
            </Help>
        ) : null}
    </div>
)

AxisRange.propTypes = {
    axisId: PropTypes.string,
    disabled: PropTypes.bool,
}

export default AxisRange
