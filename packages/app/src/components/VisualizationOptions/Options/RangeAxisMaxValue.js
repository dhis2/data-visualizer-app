import React from 'react';

import i18n from '@dhis2/d2-i18n';

import TextBaseOption from './TextBaseOption';

const RangeAxisMaxValue = () => (
    <TextBaseOption
        type="number"
        placeholder={i18n.t('Max')}
        option={{
            name: 'rangeAxisMaxValue',
        }}
    />
)

export default RangeAxisMaxValue
