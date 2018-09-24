import React from 'react';
import i18n from '@dhis2/d2-i18n';
import CheckboxBaseOption from './CheckboxBaseOption';

const CumulativeValues = () => (
    <CheckboxBaseOption
        option={{
            name: 'cumulativeValues',
            label: i18n.t('Use cumulative values'),
        }}
    />
);

export default CumulativeValues;
