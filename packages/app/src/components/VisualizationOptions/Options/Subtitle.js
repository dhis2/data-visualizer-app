import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const Subtitle = () => (
    <TextBaseOption
        option={{
            name: 'subtitle',
            label: i18n.t('Chart subtitle'),
        }}
    />
);

export default Subtitle;
