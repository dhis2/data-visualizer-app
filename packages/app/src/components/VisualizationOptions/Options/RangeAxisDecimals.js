import React from 'react';
import i18n from '@dhis2/d2-i18n';

import PositiveNumberBaseType from './PositiveNumberBaseType';

const RangeAxisDecimals = () => (
    <PositiveNumberBaseType
        width="96px"
        placeholder={i18n.t('Auto')}
        option={{
            name: 'rangeAxisDecimals',
            label: i18n.t('Range axis decimals'),
        }}
    />
);

export default RangeAxisDecimals;
