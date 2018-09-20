import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const BaseLineLabel = () => (
    <TextBaseOption
        type='text'
        option={{
            name: 'baseLineLabel',
            label: i18n.t('Base line title'),
        }}
    />
);

export default BaseLineLabel;
