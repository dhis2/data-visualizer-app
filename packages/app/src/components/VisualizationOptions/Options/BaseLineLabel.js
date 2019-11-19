import React from 'react';
import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption'

const BaseLineLabel = () => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Title')}
        placeholder={i18n.t('Base line title')}
        option={{
            name: 'baseLineLabel',
        }}
        inline
    />
)

export default BaseLineLabel;
