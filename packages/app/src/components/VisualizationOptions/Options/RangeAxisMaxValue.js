import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

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
