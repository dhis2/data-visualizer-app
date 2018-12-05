import React from 'react';
import NumberBaseOption from './NumberBaseOption';
import i18n from '@dhis2/d2-i18n';

const RangeAxisMaxValue = () => (
    <NumberBaseOption
        option={{
            name: 'rangeAxisMaxValue',
            label: i18n.t('Range axis max'),
        }}
    />
);

export default RangeAxisMaxValue;
