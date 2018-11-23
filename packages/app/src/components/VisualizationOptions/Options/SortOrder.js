import React from 'react';
import i18n from '@dhis2/d2-i18n';

import SelectBaseOption from './SelectBaseOption';

const SortOrder = ({ className }) => (
    <SelectBaseOption
        className={className}
        option={{
            name: 'sortOrder',
            label: i18n.t('Sort order'),
            items: [
                { id: 0, label: i18n.t('None') },
                { id: -1, label: i18n.t('Low to high') },
                { id: 1, label: i18n.t('High to low') },
            ],
        }}
    />
);

export default SortOrder;
