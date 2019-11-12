import React from 'react';

import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption';

const Title = () => (
    <TextBaseOption
        type="text"
        placeholder={i18n.t('Add a title')}
        option={{
            name: 'title',
        }}
    />
)

export default Title;
