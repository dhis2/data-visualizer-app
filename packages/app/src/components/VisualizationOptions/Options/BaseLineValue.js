import React from 'react';
import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';

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
