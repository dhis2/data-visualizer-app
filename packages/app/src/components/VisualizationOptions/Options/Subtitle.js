import React from 'react';

import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption';

const Subtitle = () => (
    <TextBaseOption
        type="text"
        placeholder={i18n.t('Add a subtitle')}
        option={{
            name: 'subtitle',
        }}
    />
)

export default Subtitle
