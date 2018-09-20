import React from 'react';
import i18n from '@dhis2/d2-i18n';
import CheckboxBaseOption from './CheckboxBaseOption';

const PercentStackedValues = () => (
    <CheckboxBaseOption
        option={{
            name: 'percentStackedValues',
            label: i18n.t('Use 100% stacked values'),
        }}
    />
);

export default PercentStackedValues;
