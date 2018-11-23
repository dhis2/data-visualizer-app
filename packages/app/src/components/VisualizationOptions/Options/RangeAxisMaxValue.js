import React from 'react';
import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';

const RangeAxisMaxValue = () => (
    <TextBaseOption
        type="number"
        option={{
            name: 'rangeAxisMaxValue',
            label: i18n.t('Range axis max'),
        }}
    />
);

export default RangeAxisMaxValue;
