import React from 'react';
import NumberBaseOption from './NumberBaseOption';
import i18n from '@dhis2/d2-i18n';

const RangeAxisDecimals = () => (
    <NumberBaseOption
        option={{
            name: 'rangeAxisDecimals',
            label: i18n.t('Range axis decimals'),
        }}
    />
);

export default RangeAxisDecimals;
