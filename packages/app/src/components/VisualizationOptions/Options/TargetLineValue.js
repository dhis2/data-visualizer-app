import React from 'react';
import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';

const TargetLineValue = () => (
    <TextBaseOption
        type="number"
        option={{
            name: 'targetLineValue',
            label: i18n.t('Target line value'),
        }}
    />
);

export default TargetLineValue;
