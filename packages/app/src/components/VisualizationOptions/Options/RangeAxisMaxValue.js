import React from 'react'

import i18n from '@dhis2/d2-i18n'

import TextBaseOption from './TextBaseOption'

const RangeAxisMaxValue = () => (
    <TextBaseOption
        type="number"
        width="100px"
        placeholder={i18n.t('Max')}
        option={{
            name: 'rangeAxisMaxValue',
        }}
        inline
    />
)

export default RangeAxisMaxValue
