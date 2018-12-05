import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const TargetLineLabel = () => (
    <TextBaseOption
        option={{
            name: 'targetLineLabel',
            label: i18n.t('Target line title'),
        }}
    />
);

export default TargetLineLabel;
