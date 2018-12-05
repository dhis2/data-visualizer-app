import React from 'react';
import NumberBaseOption from './NumberBaseOption';
import i18n from '@dhis2/d2-i18n';

const TargetLineValue = () => (
    <NumberBaseOption
        option={{
            name: 'targetLineValue',
            label: i18n.t('Target line value'),
        }}
    />
);

export default TargetLineValue;
