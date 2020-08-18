import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { Label, Help } from '@dhis2/ui'

import RangeAxisMinValue from './RangeAxisMinValue'
import RangeAxisMaxValue from './RangeAxisMaxValue'

import {
    tabSectionOption,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js'

const AxisRange = ({ disabled }) => (
    <div className={tabSectionOption.className}>
        <Label>{i18n.t('Axis range')}</Label>
        <div className={tabSectionOptionComplexInline.className}>
            <RangeAxisMinValue disabled={disabled} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {'\u00A0\u2013\u00A0'}
            </div>
            <RangeAxisMaxValue disabled={disabled} />
        </div>
        {!disabled ? (
            <Help>
                {i18n.t('Values outside of the range will not be displayed')}
            </Help>
        ) : null}
    </div>
)

AxisRange.propTypes = {
    disabled: PropTypes.bool,
}

export default AxisRange
