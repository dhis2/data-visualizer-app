import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

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
