import React from 'react';

import i18n from '@dhis2/d2-i18n';

import SelectBaseOption from './SelectBaseOption';
import { options } from '../../../modules/options';

const optionName = 'regressionType';
const defaultValue = options[optionName].defaultValue;

const RegressionType = () => (
    <SelectBaseOption
        toggleable={true}
        label={i18n.t('Trend line')}
        option={{
            name: optionName,
            defaultValue: defaultValue,
            items: [
                { id: 'NONE', label: i18n.t('None') },
                { id: 'LINEAR', label: i18n.t('Linear') },
                { id: 'POLYNOMIAL', label: i18n.t('Polynomial') },
                { id: 'LOESS', label: i18n.t('Loess') },
            ],
        }}
    />
)

export default RegressionType;
