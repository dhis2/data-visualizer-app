import React from 'react'

import i18n from '@dhis2/d2-i18n'
import { Label, Help } from '@dhis2/ui'

import RangeAxisMinValue from './RangeAxisMinValue'
import RangeAxisMaxValue from './RangeAxisMaxValue'

import {
    tabSectionOption,
    tabSectionOptionComplexInline,
} from '../styles/VisualizationOptions.style.js'

const AxisRange = () => (
    <div className={tabSectionOption.className}>
        <Label>{i18n.t('Axis range')}</Label>
        <div className={tabSectionOptionComplexInline.className}>
            <RangeAxisMinValue />
            {'\u00A0\u2013\u00A0'}
            <RangeAxisMaxValue />
        </div>
        <Help>
            {i18n.t('Values outside of the range will not be displayed')}
        </Help>
    </div>
)

export default AxisRange
