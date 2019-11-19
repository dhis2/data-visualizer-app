import React from 'react';
import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption'

const TargetLineLabel = () => (
    <TextBaseOption
        type="text"
        width="280px"
        label={i18n.t('Title')}
        placeholder={i18n.t('Target line title')}
        option={{
            name: 'targetLineLabel',
        }}
        inline
    />
)

export default TargetLineLabel;
