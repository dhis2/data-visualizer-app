import React from 'react';
import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption'

const TargetLineValue = () => (
    <TextBaseOption
        type="number"
        label={i18n.t('Value')}
        option={{
            name: 'targetLineValue',
        }}
    />
)

export default TargetLineValue;
