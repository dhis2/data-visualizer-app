import React from 'react';
import NumberBaseOption from './NumberBaseOption';
import i18n from '@dhis2/d2-i18n';

const BaseLineValue = () => (
    <NumberBaseOption
        option={{
            name: 'baseLineValue',
            label: i18n.t('Base line value'),
        }}
    />
);

export default BaseLineValue;
