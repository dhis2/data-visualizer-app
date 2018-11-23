import React from 'react';
import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';

const BaseLineLabel = () => (
    <TextBaseOption
        type="text"
        option={{
            name: 'baseLineLabel',
            label: i18n.t('Base line title'),
        }}
    />
);

export default BaseLineLabel;
