import React from 'react';

import i18n from '@dhis2/d2-i18n';

import CheckboxBaseOption from './CheckboxBaseOption';

const HideLegend = () => (
    <CheckboxBaseOption
        label={i18n.t('Legend key')}
        option={{
            name: 'hideLegend',
        }}
    />
)

export default HideLegend
