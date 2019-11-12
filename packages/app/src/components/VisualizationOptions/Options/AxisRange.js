import React from 'react';

import i18n from '@dhis2/d2-i18n';
import { Field, Legend, Help } from '@dhis2/ui-core';

import RangeAxisMinValue from './RangeAxisMinValue';
import RangeAxisMaxValue from './RangeAxisMaxValue';

const AxisRange = () => (
    <Field>
        <Legend>{i18n.t('Axis range')}</Legend>
        <div>
            <RangeAxisMinValue />
            {' - '}
            <RangeAxisMaxValue />
        </div>
        <Help>
            {i18n.t('Values outside of the range will not be displayed')}
        </Help>
    </Field>
);

export default AxisRange;
