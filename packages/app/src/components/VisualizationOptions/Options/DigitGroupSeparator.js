import React from 'react';

import i18n from '@dhis2/d2-i18n';

import SelectBaseOption from './SelectBaseOption';

const DigitGroupSeparator = () => (
    <SelectBaseOption
        label={i18n.t('Digit group separator')}
        option={{
            name: 'digitGroupSeparator',
            items: [
                { id: 'NONE', label: i18n.t('None') },
                { id: 'SPACE', label: i18n.t('Space') },
                { id: 'COMMA', label: i18n.t('Comma') },
            ],
        }}
    />
);

export default DigitGroupSeparator;
