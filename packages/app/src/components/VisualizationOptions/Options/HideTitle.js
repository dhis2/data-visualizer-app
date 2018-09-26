import React from 'react';
import i18n from '@dhis2/d2-i18n';
import CheckboxBaseOption from './CheckboxBaseOption';

const HideTitle = () => (
    <CheckboxBaseOption
        option={{
            name: 'hideTitle',
            label: i18n.t('Hide title'),
        }}
    />
);

export default HideTitle;
