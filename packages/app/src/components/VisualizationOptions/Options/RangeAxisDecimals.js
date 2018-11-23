import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const RangeAxisDecimals = ({ className }) => (
    <TextBaseOption
        className={className}
        type="number"
        option={{
            name: 'rangeAxisDecimals',
            label: i18n.t('Range axis decimals'),
        }}
    />
);

export default RangeAxisDecimals;
