import React from 'react';
import TextBaseOption from './TextBaseOption';
import i18n from '@dhis2/d2-i18n';

const Subtitle = ({ className }) => (
    <TextBaseOption
        className={className}
        type="text"
        option={{
            name: 'subtitle',
            label: i18n.t('Chart subtitle'),
        }}
    />
);

export default Subtitle;
