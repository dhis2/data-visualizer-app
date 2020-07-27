import React from 'react';
import i18n from '@dhis2/d2-i18n';
import CheckboxBaseOption from './CheckboxBaseOption';

const HideLegend = () => (
    <CheckboxBaseOption
        option={{
            name: 'hideLegend',
            label: i18n.t('Show legend key'),
        }}
        inverted
    />
);

export default HideLegend;
