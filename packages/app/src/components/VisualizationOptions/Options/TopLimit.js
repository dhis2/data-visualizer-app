import React from 'react';

import i18n from '@dhis2/d2-i18n';

import SelectBaseOption from './SelectBaseOption';

const TopLimit = () => (
    <SelectBaseOption
        label={i18n.t('Top limit')}
        option={{
            name: 'topLimit',
            items: [
                { id: '0', label: i18n.t('None') },
                { id: '5', label: '5' },
                { id: '10', label: '10' },
                { id: '20', label: '20' },
                { id: '50', label: '50' },
                { id: '100', label: '100' },
            ],
        }}
    />
);

export default TopLimit;
