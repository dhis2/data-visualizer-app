import React from 'react';

import i18n from '@dhis2/d2-i18n';

import SelectBaseOption from './SelectBaseOption';

const DisplayDensity = () => (
    <SelectBaseOption
        label={i18n.t('Display density')}
        option={{
            name: 'displayDensity',
            items: [
                { id: 'COMFORTABLE', label: i18n.t('Comfortable') },
                { id: 'NORMAL', label: i18n.t('Normal') },
                { id: 'COMPACT', label: i18n.t('Compact') },
            ],
        }}
    />
);

export default DisplayDensity;
