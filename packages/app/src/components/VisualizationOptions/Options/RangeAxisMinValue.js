import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const RangeAxisMinValue = ({ className }) => (
    <TextBaseOption
        className={className}
        type="number"
        option={{
            name: 'rangeAxisMinValue',
            label: i18n.t('Range axis min'),
        }}
    />
);

export default RangeAxisMinValue;
