import React from 'react';

import i18n from '@dhis2/d2-i18n';

import SelectBaseOption from './SelectBaseOption';
import { options } from '../../../modules/options';

const optionName = 'sortOrder';
const defaultValue = options[optionName].defaultValue;

const SortOrder = () => (
    <SelectBaseOption
        toggleable={true}
        label={i18n.t('Custom sort order')}
        option={{
            name: optionName,
            defaultValue: defaultValue,
            items: [
                { id: '-1', label: i18n.t('Low to high') },
                { id: '1', label: i18n.t('High to low') },
                { id: '0', label: i18n.t('None') },
            ],
        }}
    />
)

export default SortOrder;
