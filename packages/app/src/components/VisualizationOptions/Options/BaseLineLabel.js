import React from 'react';
import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption'

const BaseLineLabel = () => (
    <TextBaseOption
        type="text"
        label={i18n.t('Title')}
        option={{
            name: 'baseLineLabel',
        }}
    />
)

export default BaseLineLabel;
