import React from 'react';

import i18n from '@dhis2/d2-i18n';
import { Field, Help } from '@dhis2/ui-core';

import RangeAxisMinValue from './RangeAxisMinValue';
import RangeAxisMaxValue from './RangeAxisMaxValue';

import { tabSectionOptionComplexInline } from '../styles/VisualizationOptions.style.js';

const AxisRange = () => (
    <Field>
        <label>{i18n.t('Axis range')}</label>
        <div className={tabSectionOptionComplexInline.className}>
            <RangeAxisMinValue />
            {'\u00A0\u2013\u00A0'}
            <RangeAxisMaxValue />
        </div>
        <Help>
            {i18n.t('Values outside of the range will not be displayed')}
        </Help>
    </Field>
);

export default AxisRange;
