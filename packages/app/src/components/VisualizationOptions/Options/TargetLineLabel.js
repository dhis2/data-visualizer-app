import React from 'react';
import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';

const TargetLineLabel = () => (
    <TextBaseOption
        type="text"
        option={{
            name: 'targetLineLabel',
            label: i18n.t('Target line title'),
        }}
    />
);

export default TargetLineLabel;
