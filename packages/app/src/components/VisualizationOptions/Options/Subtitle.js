import React from 'react';
import i18n from '@dhis2/d2-i18n';
import TextBaseOption from './TextBaseOption';

const Subtitle = () => (
    <TextBaseOption
        type="text"
        option={{
            name: 'subtitle',
            label: i18n.t('Chart subtitle'),
        }}
    />
);

export default Subtitle;
