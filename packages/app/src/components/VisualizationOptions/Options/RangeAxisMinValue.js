import React from 'react';

import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption';

const RangeAxisMinValue = () => (
    <TextBaseOption
        type="number"
        placeholder={i18n.t('Min')}
        option={{
            name: 'rangeAxisMinValue',
        }}
    />
)

export default RangeAxisMinValue;
