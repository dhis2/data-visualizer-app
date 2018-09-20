import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const BaseLineValue = () => (
    <TextBaseOption
        type="number"
        option={{
            name: 'baseLineValue',
            label: i18n.t('Base line value'),
        }}
    />
);

export default BaseLineValue;
