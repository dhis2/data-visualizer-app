import React from 'react';
import i18n from '@dhis2/d2-i18n';
import CheckboxBaseOption from './CheckboxBaseOption';

const HideSubtitle = () => (
    <CheckboxBaseOption
        option={{
            name: 'hideSubtitle',
            label: i18n.t('Hide subtitle'),
        }}
    />
);

export default HideSubtitle;
