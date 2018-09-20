import React from 'react';
import i18n from '@dhis2/d2-i18n';
import CheckboxBaseOption from './CheckboxBaseOption';

const ShowData = () => (
    <CheckboxBaseOption
        option={{
            name: 'showData',
            label: i18n.t('Show values'),
        }}
    />
);

export default ShowData;
